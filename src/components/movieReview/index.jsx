import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MovieReview = ({ review }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Review By: {review.author}
      </Typography>
      <Box sx={{ mt: 1, px: 2 }}>
        <Typography variant="body1">{review.content}</Typography>
      </Box>
    </Box>
  );
};
export default MovieReview
  