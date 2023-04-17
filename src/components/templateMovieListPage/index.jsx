import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";

const styles = {
  root: {
    backgroundColor: "#373B38",
  }
};

function MovieListPageTemplate({ movies, title, handleClick, action }) {
  return (
    <Grid container sx={styles.root}>

      <Grid item xs={12}>
        <Header title={title} handleClick={handleClick}  />
      </Grid>

      <Grid item container spacing={2}>
        <MovieList action={action} movies={movies} />
      </Grid>
      
    </Grid>
  );
}
export default MovieListPageTemplate;
