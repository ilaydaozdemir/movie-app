import React from "react";
import Card from "./Card";
import "../styles/Card.scss";

import { Movie } from "./Card";

interface CardGridProps {
  movies: Movie[];
}

const CardGrid: React.FC<CardGridProps> = ({ movies }) => {
  return (
    <div className="card-container">
      {movies.map((movie) => (
        <Card key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default CardGrid;
