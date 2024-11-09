import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./App.scss";
import { Movie } from "./components/Card";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiKey = "e6582eee";

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=Pokemon` // `s=Pokemon` For parameter search
      );
      const data = await response.json();
      if (data.Response === "True") {
        const movieList: Movie[] = data.Search.map((movie: any) => ({
          name: movie.Title,
          releaseDate: movie.Year,
          imdbID: movie.imdbID,
        }));
        setMovies(movieList);
      } else {
        console.error("Film bulunamadı", data.Error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Movie List</h1>
      <CardGrid movies={movies} />
    </div>
  );
};

export default App;
