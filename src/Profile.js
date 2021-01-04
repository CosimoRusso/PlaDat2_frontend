import React, {useContext, useEffect, useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MUIDrawer from './components/ProfileDrawer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ModalPersonal from './components/Student/ModalPersonal';
import ModalDescription from './components/Student/ModalDescription';
import ModalChangePass from './components/Student/ModalChangePass';
import Avatar from '@material-ui/core/Avatar';
import {UserContext} from './utils/user-context';
import utils from './utils';
import { useSnackbar } from "notistack";

const {get} = utils;


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

    info: {
        margin: 15,
        padding: 10
    },

    divSpacing: {
        marginTop: 3,
    },
    divTop: {
      marginLeft: 80,
      marginTop: 90,
    },

    divTopMargin: {
      marginTop: 50,
    },

    divSmall: {
      marginTop: 30,
    },
    large: {
      width: 50,
      height: 50,
      '@media (min-width:600px)': {
        width: 70,
        height: 70,
      },
    },
    paper: {
      padding: theme.spacing(2),
      width: 300,
      '@media (min-width:1000px)': {
        padding: theme.spacing(2),
        width: 450,
      },
      '@media (min-width:1500px)': {
        padding: theme.spacing(2),
        width: 500,
      },
      marginTop: 20,

    },

    margininfo: {
    marginLeft: 5,
    marginTop: 5,
    },




}));


export default function GeneralInfo(props) {
    const classes = useStyles();
    const studentId = props.match.params.studentId;
    const {user} = useContext(UserContext);
    const {enqueueSnackbar} = useSnackbar();
    const setError = message => enqueueSnackbar(message, {variant: 'error'});
    const [ userData, setUserData ] = useState({
        firstName: '',
        lastName: '',
        gender: 'male',
        country: '',
        city: '',
        dateOfBirth: '',
        email: '',
        phone: '+393333333333'
    });
    const dataLoaded = useRef(false);

    const updateUser = () => {
        loadUser().then(() => {});
    }

    const loadUser = async () => {
        const userRes = await get('/student/findOne/' + (studentId || user.userId));
        if (userRes.status !== 200){
            setError("Error: " + userRes.data.message);
            return;
        }
        if (userRes.data.CityId){
            const cityRes = await get('/cities/findOne/' + userRes.data.CityId);
            if (cityRes.status === 200){
                userRes.data.city = cityRes.data.name;
                userRes.data.country = cityRes.data.Country.name;
            }
        }
        setUserData(userRes.data);
    }

    useEffect(() => {
        if(dataLoaded.current === false){
            dataLoaded.current = true;
            loadUser().then(() => {});
        }
    });

    return (
        <div className={classes.root}>
          <div>
           <MUIDrawer studentId={studentId}/>
           </div>
           <div className={classes.divTop}>


           <Grid container >

        <Grid item xl={12} lg={10} md={10} sm={12} xs={12}>
        <Typography  variant="h5" style={{color: "#393e46"}} >Profile Details</Typography>
        </Grid>

        <Grid item xl={4} lg={6} md={6} sm={6}>
          <Paper className={classes.paper}>
          <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Personal Details</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end">
                         {!studentId && <ModalPersonal updateUser={updateUser} userData={userData}/>}
                     </Grid>

                    <Grid xl={4} lg={4} md={4} sm={4} xs={5} item>
           <Avatar className={classes.large}>{userData.firstName && userData.firstName.substr(0,1)}</Avatar>
           <Typography color="textSecondary" variant="subtitle1">
                  First Name
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {userData.firstName}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  Last Name
                </Typography>
                <Typography variant="subtitle2">
                    {userData.lastName}
                </Typography>
          </Grid>
                    <Grid item xl={8} lg={8} md={7} sm={7} xs={7} container >

              <Grid item xs xl={5} lg={6}>
                <Typography color="textSecondary" variant="subtitle1">
                  Country
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {userData.country}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  City
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {userData.city}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  Date of Birth
                </Typography>
                <Typography variant="subtitle2">
                    {userData.dateOfBirth}
                </Typography>
              </Grid>

            <Grid item   xl={4} lg={6}>
            <Typography color="textSecondary" variant="subtitle1">
                  Email address
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {userData.email}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  Phone
                </Typography>
                <Typography variant="subtitle2">
                    {userData.phone}
                </Typography>
                </Grid>
            </Grid>
                </ThemeProvider>
            </Grid>
            </Paper>

            {!studentId && <Paper className={classes.paper}>
            <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Change Password</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end">
                         { !studentId && <ModalChangePass/>}
                     </Grid>
                </ThemeProvider>
            </Grid>
          </Paper>}
        </Grid>

        <Grid item xl={4} lg={6}>

        <Grid item xl={4} lg={3}>

          <Paper className={classes.paper}>
          <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Description</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end">
                         {!studentId && <ModalDescription/>}</Grid>
                      <Grid item xl={12} lg={10} md={7} sm={7} xs={9} container >

<Grid item xl={12} lg={12} xs={12}>
<p>Description here</p>
</Grid>
</Grid>

                      </ThemeProvider>
                      </Grid>
          </Paper>
        </Grid>




        </Grid>



        </Grid>


            </div>
        </div>
    );
}