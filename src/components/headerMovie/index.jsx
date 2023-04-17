import React, { useContext } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};


const MovieHeader = (props) => {
  const movie = props.movie;
  const { favourites } = useContext(MoviesContext);
  const isMovieFav = favourites.some((currMovie) => currMovie === movie.id);

  return (
    <Paper component="div" sx={styles.root}>

      <Typography variant="h4" component="h3" >
        <a href={movie.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
        <span>{`${movie.title}`}</span>
        <br />
        <span>{`${movie.tagline}`}</span>
      </Typography>

      {isMovieFav ? (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      ) : null}

    </Paper>
  );
};

export default MovieHeader;
