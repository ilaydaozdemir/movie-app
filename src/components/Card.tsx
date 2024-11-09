import React from "react";
import "../styles/Card.scss";

export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.Poster} alt={movie.Title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{movie.Title}</h3>
        <p className="card-release-date">{movie.Year}</p>
      </div>
    </div>
  );
};

export default Card;
