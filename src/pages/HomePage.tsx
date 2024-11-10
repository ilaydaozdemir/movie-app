import React, { useEffect } from "react";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setMovies,
  setSearchTerm,
  setSearchType,
  setSelectedYear,
  setCurrentPage,
  setTotalPages,
} from "../features/movies/moviesSlice";
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    movies,
    searchTerm,
    searchType,
    selectedYear,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.movies);

  const apiKey = "e6582eee";
  const moviesPerPage = 10; //per page

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSearchType(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedYear(event.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const yearParam = selectedYear ? `&y=${selectedYear}` : "";
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${currentPage}&type=${searchType}${yearParam}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        const totalResults = parseInt(data.totalResults, 10);
        dispatch(setMovies(data.Search));
        dispatch(setTotalPages(Math.ceil(totalResults / moviesPerPage)));
      } else {
        console.error("Movie not found", data.Error);
      }
    };

    fetchMovies();
  }, [dispatch, currentPage, searchTerm, selectedYear, searchType]);

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

      <CardGrid movies={movies} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default HomePage;
