import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { titleFiltering, genreFiltering } from './homePage'
import CustomPagination from '../components/CustomPagination'

const ExploreMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: discoverData, error: discoverError, isLoading: discoverLoading, isError: discoverIsError } = useQuery(["discover", { id: currentPage }], getMovies);

    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering]
    );

    if (discoverLoading) {
        return <Spinner />;
    }

    if (discoverIsError) {
        return <h1>{discoverError.message}</h1>;
    }

    const changeFilterValues = (type, value) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    let movies = discoverData ? discoverData.results : [];
    movies = filterFunction(movies);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <PageTemplate
                movies={movies}
                action={(movie) => {
                    return <AddToFavouritesIcon movie={movie} />
                }}
            />

            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            />

            <CustomPagination
                currentPage={currentPage}
                totalPages={20}
                onPageChange={handlePageChange}
            />
        </>
    );

};


export default ExploreMoviesPage;
