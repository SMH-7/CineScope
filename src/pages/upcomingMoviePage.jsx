import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import { titleFiltering, genreFiltering } from "../pages/favouriteMoviesPage";
import MovieFilterUI from "../components/movieFilterUI";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const UpcomingPage = () => {
    const { watchList: movieIds } = useContext(MoviesContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
      [],
      [titleFiltering, genreFiltering]
    );

    const movieQueries = useQueries(
      movieIds.map((movieId) => {
        return {
          queryKey: ["movie", { id: movieId }],
          queryFn: getMovie,
        };
      })
    );

    const isLoading = movieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allMovies = movieQueries.map((q) => q.data);
    const displayMovies = allMovies
      ? filterFunction(allMovies)
      : [];

    const changeFilterValues = (type, value) => {
      const changedFilter = { name: type, value: value };
      const updatedFilterSet =
        type === "title"
          ? [changedFilter, filterValues[1]]
          : [filterValues[0], changedFilter];
      setFilterValues(updatedFilterSet);
    };

    return (
      <>
        <PageTemplate
          title="Watchlist"
          movies={displayMovies}
          action={(movie) => {
            return (
              <>
                <RemoveFromWatchlist movie={movie} />
              </>
            );
          }}
        />
  
        <MovieFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
        />
      </>
    );
};
export default UpcomingPage