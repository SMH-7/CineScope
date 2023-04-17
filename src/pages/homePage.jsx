import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies, getUpComingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import AddToMustWatch from '../components/cardIcons/addToMustWatch'
import { useQueryClient } from "react-query";
import { useNavigate } from 'react-router-dom';

export const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage = (props) => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries(["discover", { id: 1 }]);
  // queryClient.invalidateQueries(["upcoming", { id: 1 }]);

  const navigate = useNavigate();
  const { data: discoverData, error: discoverError, isLoading: discoverLoading, isError: discoverIsError } = useQuery(["discover", { id: 1 }], getMovies);
  const { data: upcomingData, error: upcomingError, isLoading: upcomingLoading, isError: upcomingIsError } = useQuery(["upcoming", { id: 1 }], getUpComingMovies);

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (discoverLoading || upcomingLoading) {
    return <Spinner />;
  }

  if (discoverIsError || upcomingIsError) {
    return <h1>{discoverError.message}{upcomingError.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const currMovies = discoverData ? discoverData.results : [];
  const filter1Out = filterFunction(currMovies);

  const upcomingMovies = upcomingData ? upcomingData.results : [];
  const filter2Out = filterFunction(upcomingMovies);

  const navMovies = () => {
    navigate('/explore/movies');
  };

  
  const navUpcoming = () => {
    navigate('/explore/upcomings');
  };

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        handleClick={navMovies}
        movies={filter1Out}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />

      <PageTemplate
        title="Upcoming Movies"
        handleClick={navUpcoming}
        movies={filter2Out}
        action={(movie) => {
          return <AddToMustWatch movie={movie} />
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

export default HomePage;
