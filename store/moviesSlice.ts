// moviesSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from './index';
import {IMovie} from '../interface/movies';

interface MoviesState {
  movies: IMovie[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: 'idle',
  error: null,
};

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=1857bf81e097e9ee68dbf4c39b377243';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number) => {
    const response = await axios.get(
      `${API_URL}&sort_by=popularity.desc&page=${page}`,
    );
    return response.data;
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const ids = state.movies.map(movie => movie.id);
        const newMovies = action.payload.results.filter(
          (movie: IMovie) => !ids.includes(movie.id),
        );
        state.movies = [...state.movies, ...newMovies];
        console.log(state.movies.length);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'An error occurred.';
      });
  },
});

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectLoading = (state: RootState) => state.movies.loading;
export const selectError = (state: RootState) => state.movies.error;

export default moviesSlice.reducer;
