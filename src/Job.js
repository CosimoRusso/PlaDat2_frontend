import React from 'react';
import history from './history';
import Navbar from './components/Navbar';
import Carousel from 'react-elastic-carousel';
import Card from './components/Card';
import './job.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 20,
    },

    avatarStyle: {
        width: 70,
        height: 70,
    },

    topMargin:{
        marginTop: 20,
    },

    marginLeft:{
      marginLeft: 10,
  },

    color: {
      background: '#03a9f4',
      '&:hover': {
        background: "#1076a3",
     },
    },

}));


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
]

export default function CardCarousel() {
    const classes = useStyles();

    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Grid container spacing={3} alignItems="center">
            <Grid
              container
              item
              xs={3}
              sm={2}
              md={1}
              lg={1}
              justify="flex-start"
            >
              <Avatar className={classes.avatarStyle} />
            </Grid>
            <Grid item xs={5} sm={7} md={8} lg={8} justify="flex-start">
            <Typography variant="h5">React Developer</Typography>
              <Typography variant="h6">Netflix</Typography>
            </Grid>
            <Grid container item xs={4} sm={3} md={3} lg={3} justify="flex-end">
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => history.push("/job")}
                className={classes.color}
              >
                Apply now
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid container item xs={12} md={12} lg={12} justify="flex-start">
              <Grid>
                <Typography variant="subtitle1">Los Angeles | USA | Remote | 500e</Typography>
                <Typography variant="h6">Description</Typography>
              </Grid>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet semper metus. Ut placerat dictum ornare. Integer
                suscipit ligula metus, sed consectetur elit lobortis eu. Fusce
                nec metus eu lorem dignissim aliquet vitae id leo. Nam vitae
                nisl hendrerit, elementum risus eget, elementum neque. Quisque
                sed erat interdum, rutrum nisl a, semper eros. Cras auctor lorem
                quis ultrices volutpat. Suspendisse potenti. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Duis pharetra, diam et placerat consequat, erat purus
                maximus nunc, vitae vehicula lectus sapien vel velit. Praesent
                ut cursus urna. Duis pretium mauris non condimentum semper.
                Mauris sed ante pharetra, tincidunt lacus id, posuere urna. Sed
                lobortis velit neque, ac placerat sapien dapibus ac. Curabitur
                posuere nisi malesuada mauris malesuada tempor. Praesent
                ullamcorper condimentum venenatis. Suspendisse metus felis,
                laoreet hendrerit vehicula ac, lacinia a enim.
              </p>
              <div className={classes.topMargin}>
                <Chip
                  variant="outlined"
                  color="primary"
                  label="HTML"
                  href="#chip"
                  clickable
                />
                <Chip
                  className={classes.marginLeft}
                  variant="outlined"
                  color="primary"
                  label="CSS"
                  href="#chip"
                  clickable
                />
                <Chip
                  className={classes.marginLeft}
                  variant="outlined"
                  color="primary"
                  label="REACT"
                  href="#chip"
                  clickable
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container justify="center" lg={12}>
          <h2>Similar internships</h2>
        </Grid>
        <Carousel breakPoints={breakPoints} className={classes.topMargin}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Carousel>
      </div>
    );
}