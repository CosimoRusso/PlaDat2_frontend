import React from "react";
import Navbar from "./components/Navbar";
import AllJobs from "./components/AllJobs";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
margin: {
  marginTop: '30px',
}
}));
const Jobs = props => {
  const classes = useStyles();
  return <div>
      <Navbar/>
      <Grid className={classes.margin}
  container
  direction="row"
  justify= "center"
  alignContent="center"
>
  <Grid item><AllJobs/></Grid>

      </Grid></div>;
};

export default Jobs;
