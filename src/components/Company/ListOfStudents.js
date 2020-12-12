import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from '../Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from './MenuListOfStudent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import {UserContext} from "../../utils/user-context";
import utils from '../../utils'
import CustomizedSnackbars from "../CustomSnackbar";

const { get } = utils;

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
      marginTop: 30,
    },

    color: {
      color: '#03a9f4',
    },

    large: {
      width: 50,
      height: 50,
      '@media (min-width:600px)': {
        width: 70,
        height: 70,
      },
      '@media (min-width:1000px)': {
        width: 80,
        height: 80,
      },
    },
    paper: {
        padding: theme.spacing(1),
        '@media (min-width:600px)': {
          padding: theme.spacing(2),
        },
      },
      paper2: {
        padding: theme.spacing(2),
      },


}));


export default function GeneralInfo(props) {
    const classes = useStyles();
    const jobId = parseInt(props.match.params.jobId);
    const {user} = useContext(UserContext);
    const dataFetched = useRef(false);
    const [showAlert, setShowAlert] = useState({type: 'error', message: ''});
    const [students, setStudents] = useState([]);
    const [job, setJob] = useState(null);

    const fetchData = async () => {
        const jobRes = await get(`/jobs/findOne/${jobId}`);
        if (jobRes.status !== 200){
            setShowAlert({type: 'error', message: 'Error while fetching job: ' + jobRes.data.message});
            return;
        }
        setJob(jobRes.data);

        const studentsRes = await get('/company/candidateStudents/'+jobId, '', user.jwt);
        if (studentsRes.status !== 200){
            setShowAlert({type: 'error', message: 'Error while fetching users: ' + studentsRes.data.message});
            return;
        }
        const studentsList = await Promise.all(studentsRes.data.map(async s => {
            const res = await get('/student/findOne/'+s.id);
            if (res.status === 200) return res.data;
            return s;
        }));
        setStudents(studentsList);
    }

    useEffect(() => {
        if (!dataFetched.current){
            dataFetched.current = true;
            fetchData().then(() => {});
        }
    });

    return (
        <div className={classes.root}>
          <div>
           <Navbar/>
           </div>
           <div className={classes.divTop}/>
           <ThemeProvider theme={theme}>
           <Container fixed>
           <Typography variant="h3">List of Students for job {job && job.name}</Typography>
           <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="space-between"
            >
           {students.map(s =>
               <Grid item xl={2} lg={2} xs={5} sm={5} md={5} style={{marginTop: 20}}  >
                   <Paper className={classes.paper} style={{textAlign: "center"}}>
                       <Grid container justify="flex-end" alignItems="flex-end"><Menu/></Grid>
                       <Grid container justify="center" >
                           <Avatar className={classes.large} alt="Company logo"><Typography variant="h2" style={{fontSize: 40}}>{s.firstName.substr(0,1)}</Typography></Avatar>
                       </Grid>
                       <Typography style={{marginTop: 5}} className={classes.color}>{s.firstName + " " + s.lastName}</Typography>
                       <Grid container justify="center">
                           <Typography style={{fontSize: 13}} color="textSecondary">{s.City && s.City.name}, {s.City.Country.name}</Typography>
                           <LocationOnIcon className={classes.color} fontSize="small"/>
                       </Grid>
                       <Typography style={{fontSize: 15, marginBottom: 12}}>{s.skills && s.skills.map(sk => sk.name).join(', ')}</Typography>
                   </Paper>
               </Grid>
           )}

            </Grid>
            </Container>
            </ThemeProvider>
            <CustomizedSnackbars type={showAlert.type} message={showAlert.message} />
        </div>
    );
}