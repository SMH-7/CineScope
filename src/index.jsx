import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ExploreMoviesPage from './pages/exploreMoviesPage'
import ExploreUpcomingPage from './pages/exploreUpcomingPage'
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import SignOut from './components/AuthOut'
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingPage from "./pages/upcomingMoviePage";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import MoviesContextProvider from "./contexts/moviesContext";
import { UserProvider } from './contexts/userContext';
import { PrivateRoute } from './contexts/PrivateRoute';

import AddMovieReviewPage from './pages/addMovieReviewPage'
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <UserProvider>
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/form" element={<PrivateRoute><AddMovieReviewPage /></PrivateRoute>} />
              <Route path="/movies/favourites" element={<PrivateRoute><FavouriteMoviesPage /></PrivateRoute>} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/upcoming" element={<PrivateRoute><UpcomingPage /></PrivateRoute>} />
              <Route path="/" element={<HomePage />} />
              <Route path="/explore/movies" element={<ExploreMoviesPage />} />
              <Route path="/explore/upcomings" element={<ExploreUpcomingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
            </Routes>
          </MoviesContextProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
