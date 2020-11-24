import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  margin: {
    marginTop: '30px',

  }
}));

  export default function FullWidthGrid() {
    const classes = useStyles();

    return (

    <div className={classes.root}>
      <Navbar/>
<Drawer/>
      <Grid className={classes.margin}
  container
  direction="row"
  justify= "center"
>

<Grid item lg={4}>
  <Card />
  </Grid>
  <Grid item lg={4}>
  <Card/>
  </Grid>
  <Grid item lg={4}>
  <Card/>
  </Grid>
  <Grid item lg={4}>
  <Card/>
  </Grid>
  <Grid item lg={4}>
  <Card/>
  </Grid>
  <Grid item lg={4}>
  <Card/>
  </Grid>
  </Grid>
  </div>
  );
}


