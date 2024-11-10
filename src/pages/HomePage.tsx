import React, { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import { Movie } from "../components/Card";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("Pokemon");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<string>("movie");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);

  const apiKey = "e6582eee";
  const moviesPerPage = 10; //per page

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchType(event.target.value);
    setCurrentPage(1);
  };
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setCurrentPage(1);
  };
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );
  useEffect(() => {
    const fetchMovies = async () => {
      const yearParam = selectedYear ? `&y=${selectedYear}` : "";
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${currentPage}&type=${searchType}${yearParam}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        const totalResults = parseInt(data.totalResults, 10);
        setMovies(data.Search);
        setTotalPages(Math.ceil(totalResults / moviesPerPage));
      } else {
        console.error("Movie not found", data.Error);
      }
    };

    fetchMovies();
  }, [currentPage, searchTerm, selectedYear, searchType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="input-group">
        {/* Search Input*/}
        <div>
          {" "}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by movie name..."
            className="search-input"
          />
        </div>
        {/* Search Type Selection (Movie, TV Series, Episode) */}
        <div>
          {" "}
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="search-type-select"
          >
            <option value="movie">Film</option>
            <option value="series">TV Series</option>
            <option value="episode">TV Episode</option>
          </select>
        </div>

        {/* Search for year */}
        <div>
          {" "}
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="search-year-select"
          >
            <option value="">All Years</option>

            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
      </div>

      <CardGrid movies={currentMovies} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default HomePage;
