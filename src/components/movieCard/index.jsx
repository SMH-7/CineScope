import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';

import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: {
    maxWidth: 345,
    height: 500,
    backgroundColor: "#AEA99D" ,
  },
  media: {
    height: 300,
    objectFit: "contain",
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  cursor: "pointer",
  rating: {
    display: 'flex',
    alignItems: 'center'
  },
};

export default function MovieCard({ movie, action }) {
  const { favourites, watchList } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false
  }
  if (watchList.find((id) => id === movie.id)) {
    movie.onWatch = true;
  } else {
    movie.onWatch = false
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.onWatch ? (
            <Avatar sx={styles.avatar}>
              <PlaylistAddIcon />
            </Avatar>
          ) : null
        }

        title={
          <Typography variant="h5" component="p" sx={{ fontFamily: 'Georgia, serif' }}>
            {movie.title}
          </Typography>
        }
      />

      <Link to={`/movies/${movie.id}`}>
        <CardMedia
          sx={styles.media}

          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }

        />
        {action(movie)}
      </Link>


      <CardContent>

        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              {new Date(movie.release_date).getFullYear()}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="p" sx={styles.rating}>
              <StarRateIcon fontSize="small" sx={{ mr: 1 }} />
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Grid>

        </Grid>
        
      </CardContent>

    </Card>
  );
}
