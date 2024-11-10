import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../components/Card";

interface MoviesState {
  movies: Movie[];
  searchTerm: string;
  searchType: string;
  selectedYear: string;
  currentPage: number;
  totalPages: number;
}

const initialState: MoviesState = {
  movies: [],
  searchTerm: "Pokemon",
  searchType: "movie",
  selectedYear: "",
  currentPage: 1,
  totalPages: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSearchType(state, action: PayloadAction<string>) {
      state.searchType = action.payload;
      state.currentPage = 1;
    },
    setSelectedYear(state, action: PayloadAction<string>) {
      state.selectedYear = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setMovies,
  setSearchTerm,
  setSearchType,
  setSelectedYear,
  setCurrentPage,
  setTotalPages,
} = moviesSlice.actions;
export default moviesSlice.reducer;
