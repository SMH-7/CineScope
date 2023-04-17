import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
    backgroundColor: "#373B38",
    marginTop: 1.5,
    paddingBottom: 1.5
  },  
  buttonColor : { 
    backgroundColor: '#93F769',
    color: "#373B38" }
};

const Header = (props) => {
  const title = props.title
  const handleClick = props.handleClick

  return (
    <Paper component="div" sx={styles.root}>

      {title && (
        <Typography variant="h4" component="h3" sx={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#93F769',
          textTransform: 'capitalize',
          textAlign: 'center'
        }}>
          {title}
        </Typography>
      )}



      {handleClick && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={handleClick}
          style={ styles.buttonColor}
        >
          Browse All
        </Button> 
      )}


    </Paper>
  );
};

export default Header;
