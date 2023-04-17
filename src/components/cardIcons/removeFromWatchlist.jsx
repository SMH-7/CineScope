import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlist = ({ movie }) => {
    const context = useContext(MoviesContext);

    const onUserRequest = (e) => {
        e.preventDefault();
        context.removeFromWatchlist(movie);
    };

    return (
        <IconButton
            aria-label="remove from watchlist"
            onClick={onUserRequest}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromWatchlist