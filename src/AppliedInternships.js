import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MUIDrawer from './components/ProfileDrawer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppliedCard from './components/Student/AppliedCard';


const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.5rem',
  fontWeight: 500,
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
    fontWeight: 500,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
    fontWeight: 500,
  },
};


theme.typography.h5 = {
  fontSize: '1.3rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },

};

theme.typography.h6 = {
  fontSize: '0.8rem',
  fontWeight: 200,
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
    fontWeight: 200,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
    fontWeight: 300,
  },
};



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    divTop: {
      marginLeft: 30,
      marginTop: 100,
    },
    divTop2: {
      marginTop: 50,
    },

}));


export default function GeneralInfo() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
  <MUIDrawer />
<Grid className={classes.divTop}
  container
  direction="row"
  justify= "center"

>
<Grid item xl={11} lg={11} md={11} sm={11} xs={10}>
        <Typography  variant="h5" style={{color: "#393e46"}} >Applied Internships</Typography>
        </Grid>
                    <ThemeProvider  theme={theme}>
                      <div className={classes.divTop2}/>
                <Grid item lg={4} xl={2} xs={12} md={4} sm={6}>
                <AppliedCard/>
                </Grid>
                <Grid item lg={4} xl={2} xs={12} md={4} sm={6}>
                <AppliedCard/>
                </Grid>
                <Grid item lg={4} xl={2} xs={12} md={4} sm={6}>
                <AppliedCard/>
                </Grid>

                </ThemeProvider>
            </Grid>
        </div>
    );
}