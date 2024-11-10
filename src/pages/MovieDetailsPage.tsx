import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../styles/MovieDetails.scss";
const MovieDetails: React.FC = () => {
  const { imdbID } = useParams(); // Get imdbID from URL parameter
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = "e6582eee";

  useEffect(() => {
    if (imdbID) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
          );
          const data = await response.json();
          if (data.Response === "True") {
            setMovieDetails(data);
          } else {
            console.error("Movie not found", data.Error);
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        } finally {
          setTimeout(() => setLoading(false), 2000);
        }
      };
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (loading) {
    return <div className="loading"></div>;
  }

  if (!movieDetails) {
    return <div className="error">Movie not found.</div>;
  }

  return (
    <div className="movie-container">
      <div className="movie-details">
        <h1>{movieDetails.Title}</h1>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
        <p>Year: {movieDetails.Year}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Duration: {movieDetails.Runtime}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Cast: {movieDetails.Actors}</p>
        <p>IMDb Rating: {movieDetails.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
