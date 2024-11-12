import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import MovieDetails from "./pages/MovieDetailsPage";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./store/store";
import Entry from "./components/Entry";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <h1 className="app-title">Your Gateway to Movies & TV Shows</h1>
          <Entry />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Main App Route */}
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          {/* MovieDetails Route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
