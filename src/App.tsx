import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import MovieDetails from "./pages/MovieDetailsPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <h1 className="app-title">Movie List</h1>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Main App Route */}
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
        {/* MovieDetails Route */}
      </Routes>
    </Router>
  );
};

export default App;
