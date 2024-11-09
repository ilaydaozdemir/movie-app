import React from "react";
import "../styles/Card.scss";

export interface Movie {
  name: string;
  releaseDate: string;
  imdbID: string;
}

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{movie.name}</h3>
        <p className="card-release-date">{movie.releaseDate}</p>
        <p className="card-imdb-id">IMDb ID: {movie.imdbID}</p>
      </div>
    </div>
  );
};

export default Card;
