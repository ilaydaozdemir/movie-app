import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./App.scss";
import { Movie } from "./components/Card";
import Pagination from "./components/Pagination";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("Pokemon");

  const apiKey = "e6582eee";

  const moviesPerPage = 10; //per page
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${currentPage}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        const totalResults = parseInt(data.totalResults, 10);
        setMovies(data.Search);
        setTotalPages(Math.ceil(totalResults / moviesPerPage)); // Toplam sayfa sayısını hesapla
      } else {
        console.error("Film bulunamadı", data.Error);
      }
    };

    fetchMovies();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="app">
      <h1 className="app-title">Movie List</h1>

      {/* Search Input*/}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Film adı ile ara..."
        className="search-input"
      />

      <CardGrid movies={currentMovies} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
