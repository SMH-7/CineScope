import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from '../../contexts/userContext';
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToMustWatch = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { user } = useContext(UserContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    if (user !== "") {
      context.addToWatchList(movie)
    }
  };
  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatch;