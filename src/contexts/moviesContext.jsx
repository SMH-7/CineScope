import React, { useState, useContext, useEffect } from "react";
import { supabase } from '../components/AuthUI';

import { UserContext } from '../contexts/userContext';
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchFavorites(user, setFavourites);
    fetchWatchlist(user, setWatchList)
  }, [user]);

  const addToFavourites = async (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
      setFavourites(updatedFavourites);
      saveFavoriteMovie(movie.id);
    }
  };

  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
    removeFromCloudFavorites(movie.id)
  };

  async function fetchFavorites(user, setFavourites) {
    if (user) {
      const { data, error } = await supabase
        .from("favorite_movies")
        .select("movie_id")
        .eq("user_email", user);

      if (error) {
        console.log("Error fetching favorites:", error.message);
      } else {
        const ids = data.map((fav) => fav.movie_id);
        setFavourites(ids);
      }
    }
  }

  async function saveFavoriteMovie(movieId) {
    if (user) {
      const { error } = await supabase
        .from("favorite_movies")
        .insert({ user_email: user, movie_id: movieId });

      if (error) {
        console.log("Error saving favorite movie:", error.message);
      }
    }
  };

  async function removeFromCloudFavorites(movieId) {
    if (user) {
      const { error } = await supabase
        .from("favorite_movies")
        .delete()
        .eq("user_email", user)
        .eq("movie_id", movieId);
        
      if (error) {
        console.log("Error removing favorite:", error.message);
      }
    }
  }

  const addToWatchList = async (movie) => {
    let updatedWatchList = [...watchList];
    if (!watchList.includes(movie.id)) {
      updatedWatchList.push(movie.id);
      setWatchList(updatedWatchList);
      saveUpcomingMovie(movie.id);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchList(watchList.filter((mId) => mId !== movie.id));
    removeFromCloudWatchlist(movie.id)
  };

  async function fetchWatchlist(user, setWatchList) {
    if (user) {
      const { data, error } = await supabase
        .from("upcoming_movies")
        .select("movie_id")
        .eq("user_email", user);

      if (error) {
        console.log("Error fetching watchlist:", error.message);
      } else {
        const ids = data.map((ind) => ind.movie_id);
        setWatchList(ids);
      }
    }
  };

  async function saveUpcomingMovie(movieId) {
    if (user) {
      const { error } = await supabase
        .from("upcoming_movies")
        .insert({ user_email: user, movie_id: movieId });

      if (error) {
        console.log("Error saving upcoming movie:", error.message);
      }
    }
  };

  async function removeFromCloudWatchlist(movieId) {
    if (user) {
      const { error } = await supabase
        .from("upcoming_movies")
        .delete()
        .eq("user_email", user)
        .eq("movie_id", movieId);
        
      if (error) {
        console.log("Error removing watchlist table:", error.message);
      }
    }
  }

  const addReview = (movie, review) => {   // NEW
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        watchList,
        addToFavourites,
        addToWatchList,
        removeFromFavourites,
        removeFromWatchlist,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
