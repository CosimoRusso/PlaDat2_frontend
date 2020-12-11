import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MUIDrawer from './components/ProfileDrawer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ModalPersonal from './components/Student/ModalPersonal';
import ModalEducation from './components/Student/ModalEducation';
import ModalJobExperience from './components/Student/ModalJobExperience';
import ModalChangePass from './components/Student/ModalChangePass';
import Avatar from '@material-ui/core/Avatar';
import {UserContext} from './utils/user-context';
import utils from './utils';
import CustomizedSnackbars from "./components/CustomSnackbar";

const {get, post} = utils;


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


export default function GeneralInfo() {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [ userData, setUserData ] = useState({
        firstName: '',
        lastName: '',
        gender: 'male',
        country: '',
        city: '',
        dateOfBirth: '',
        email: '',
        phone: ''
    });

    const updateUser = () => {
        loadUser().then(() => {});
    }

    const loadUser = async () => {
        const userRes = await get('/student/findOne/' + user.userId);
        if (userRes.status !== 200){
            setError("Error: " + userRes.data.message);
            return;
        }else{
            setError('');
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
        loadUser().then(() => {});
    }, []);

    return (
        <div className={classes.root}>
          <div>
           <MUIDrawer/>
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
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end"><ModalPersonal updateUser={updateUser} userData={userData}/></Grid>

                    <Grid xl={4} lg={4} md={4} sm={4} xs={5} item>
           <Avatar className={classes.large}>M</Avatar>
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
                  Gender
                </Typography>
              <Typography variant="subtitle2" gutterBottom>
                  {userData.gender}
                </Typography>
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

<Paper className={classes.paper}>
            <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Change Password</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end"><ModalChangePass/></Grid>
                </ThemeProvider>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xl={4} lg={6}>

        <Grid item xl={4} lg={3}>

          <Paper className={classes.paper}>
          <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Education</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end"><ModalEducation/></Grid>
                      <Grid item xl={12} lg={10} md={7} sm={7} xs={9} container >

<Grid item xs xl={4} lg={5} xs={9}>
<Typography color="textSecondary" variant="subtitle1">
    Institution
  </Typography>
<Typography variant="subtitle2" gutterBottom>
    Cambridge
  </Typography>
  <Typography color="textSecondary" variant="subtitle1">
    Field
  </Typography>
  <Typography variant="subtitle2" gutterBottom>
    Engineer
  </Typography>
</Grid>
<Grid item   xl={5} lg={5} xs={2}>
<Typography color="textSecondary" variant="subtitle1">
    City
  </Typography>
  <Typography variant="subtitle2" gutterBottom>
    Cambridgeshire
  </Typography>
  <Typography color="textSecondary" variant="subtitle1">
    Country
  </Typography>
  <Typography variant="subtitle2" gutterBottom>
    England
  </Typography>
</Grid>

<Grid item   xl={3} lg={2} xs={4}>
  <Typography color="textSecondary" variant="subtitle1">
    From
  </Typography>
  <Typography variant="subtitle2">
   12/09/2016
  </Typography>
  <Typography color="textSecondary" variant="subtitle1">
    To
  </Typography>
  <Typography variant="subtitle2">
   12/06/2020
  </Typography>
  </Grid>
</Grid>



                      </ThemeProvider>
                      </Grid>
          </Paper>
        </Grid>


        <Grid item xl={4} lg={3}>

<Paper className={classes.paper}>
<Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                    <ThemeProvider theme={theme}>
                      <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography className={classes.margininfo} color="textSecondary">Job Experience</Typography>
                      </Grid>
                     <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end"><ModalJobExperience/></Grid>
            <Grid item xl={12} lg={10} md={7} sm={7} xs={10} container >
<Grid item xs xl={4} lg={5} xs={8}>
<Typography color="textSecondary" variant="subtitle1">
Company
</Typography>
<Typography variant="subtitle2" gutterBottom>
Netflix
</Typography>
<Typography color="textSecondary" variant="subtitle1">
Role
</Typography>
<Typography variant="subtitle2" gutterBottom>
Web Developer
</Typography>
</Grid>
<Grid item   xl={5} lg={5} xs={4}>
<Typography color="textSecondary" variant="subtitle1">
City
</Typography>
<Typography variant="subtitle2" gutterBottom>
New York
</Typography>
<Typography color="textSecondary" variant="subtitle1">
Country
</Typography>
<Typography variant="subtitle2" gutterBottom>
USA
</Typography>
</Grid>

<Grid item   xl={3} lg={2} xs={4}>
<Typography color="textSecondary" variant="subtitle1">
From
</Typography>
<Typography variant="subtitle2">
09/05/2015
</Typography>
<Typography color="textSecondary" variant="subtitle1">
To
</Typography>
<Typography variant="subtitle2">
14/09/2015
</Typography>
</Grid>
</Grid>



            </ThemeProvider>
            </Grid>
</Paper>
</Grid>

        </Grid>



        </Grid>


            </div>
            <CustomizedSnackbars type={"error"} message={error} />
            <CustomizedSnackbars type={"success"} message={success} />
        </div>
    );
}