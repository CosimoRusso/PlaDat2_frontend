import React from 'react';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from './microsoft.png';
import Card from './components/Company/Card';
import ModalAboutUs from './components/Company/ModalAboutUs';
import ModalCompanyInfo from './components/Company/ModalCompanyInfo';



const theme = createMuiTheme();

theme.typography.h2 = {
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


theme.typography.h3 = {
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

theme.typography.h4 = {
  fontSize: '0.8rem',
  fontWeight: 200,
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
    fontWeight: 200,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
    fontWeight: 400,
  },
};




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    divTop: {
      marginTop: 40,
    },

    large: {
      width: 50,
      height: 50,
      '@media (min-width:600px)': {
        width: 70,
        height: 70,
      },
      '@media (min-width:1000px)': {
        width: 100,
        height: 100,
      },
    },
    paper: {
        padding: theme.spacing(1),
        '@media (min-width:600px)': {
          padding: theme.spacing(4),
        },
      },
      paper2: {
        padding: theme.spacing(2),
      },


}));


export default function GeneralInfo() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <div>
           <Navbar/>
           </div>
           <div className={classes.divTop}/>
           <ThemeProvider theme={theme}>
           <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>

</Grid>
</ThemeProvider>
</div>
    );
}