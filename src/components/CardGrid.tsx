import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Card.scss";

import { Movie } from "./Card";

interface CardGridProps {
  movies: Movie[];
}

const CardGrid: React.FC<CardGridProps> = ({ movies }) => {
  const navigate = useNavigate();

  const handleClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };
  return (
    <div className="card-container">
      {movies.map((movie) => (
        <div
          className="card"
          key={movie.imdbID}
          onClick={() => handleClick(movie.imdbID)}
        >
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
