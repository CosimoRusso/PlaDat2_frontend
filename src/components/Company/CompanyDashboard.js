import React, {useContext, useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./../Navbar";
import Drawer from "./../Drawer";
import Card from './Card';
import { UserContext } from "../../utils/user-context";
import utils from '../../utils';
import CustomizedSnackbars from "../CustomSnackbar";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const {get} = utils;

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
  },

}));

  export default function FullWidthGrid() {
    const classes = useStyles();
    const initialFetchDone = useRef(false);
    const {user} = useContext(UserContext);
    const [showAlert, setShowAlert] = useState({type: 'error', message: ''});
    const setError = (message) => setShowAlert({type: 'error', message})
    const [jobs, setJobs] = useState([]);
    const [jobsDisplayed, setJobsDisplayed] = useState([]);

    const discardJob = () => {
        setError('Job delete is not implemented yet');
    }

    const fetchJobs = async () => {
        const companyId = user.userId;
        const companyRes = await get('/company/findOne/' + companyId);
        if (companyRes.status !== 200){
            setError('Cannot load jobs: ' + companyRes.data.message);
            return;
        }
        for (let job of companyRes.data.Jobs){
            const cityRes = await get('/cities/findOne/' + job.CityId);
            if (cityRes.status === 200){
                job.City = cityRes.data;
            }
            job.Company = {name: companyRes.data.name, id: companyRes.data.id};
        }
        setJobs(companyRes.data.Jobs);
        setJobsDisplayed(companyRes.data.Jobs);
    }

    useEffect(() => {
        if (!initialFetchDone.current){
            initialFetchDone.current = true;
            fetchJobs().then(() => {});
        }
    })

    return (

    <div className={classes.root}>
        <Navbar/>
        <Drawer allJobs={jobs} jobs={jobsDisplayed} setJobs={setJobsDisplayed} />

        <Grid className={classes.margin}
            container
            direction="row"
            justify= "center"
        >
            <Grid container lg={4} xs={6} direction="row" >
                <Typography variant="h5">Total number of jobs: 2</Typography>
            </Grid>
            <Grid container justify="flex-end"
             lg={7} xs={5} style={{marginBottom: 30}}>  <Button style={{marginLeft: 20}} variant="contained" style={{backgroundColor: "#03a9f4", color: "white"}}>Add New Job</Button></Grid>
            { jobsDisplayed.map(j =>
                <Grid key={j.id} item lg={4} xl={2}>
                    <Card job={j} discardJob={discardJob}/>
                </Grid>) }
      <Grid item lg={4} xl={2}>
          {/* <CardAddJob/> */}
          <Card/>
      </Grid>
  </Grid>
        <CustomizedSnackbars type={showAlert.type} message={showAlert.message} setMessage={setShowAlert} />
  </div>
  );
}
