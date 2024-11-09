import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams(); // Get imdbID from URL parameter
  const [movieDetails, setMovieDetails] = useState<any>(null);

  const apiKey = "e6582eee";

  useEffect(() => {
    if (imdbID) {
      const fetchMovieDetails = async () => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovieDetails(data);
        } else {
          console.error("Film bulunamadı", data.Error);
        }
      };
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default MovieDetails;
