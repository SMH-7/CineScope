import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Typography from "@mui/material/Typography";

const styles = {
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
    color: "#333",
  },
  excerpt: {
    maxWidth: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export default function MovieReviews({ movie }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movie.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.header}>Author</TableCell>
            <TableCell align="center" sx={styles.header}>
              Excerpt
            </TableCell>
            <TableCell align="right" sx={styles.header}>
              More
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell sx={styles.excerpt}>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  <Typography variant="button">Full Review</Typography>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
