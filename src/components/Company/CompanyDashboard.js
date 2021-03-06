import React, {useContext, useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./../Navbar";
import Drawer from "./../Drawer";
import Card from './Card';
import { UserContext } from "../../utils/user-context";
import utils from '../../utils';
import { useSnackbar } from "notistack";
import Typography from '@material-ui/core/Typography';
import ModalAddJob from './ModalAddJob';


const {get, post} = utils;

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
    const {enqueueSnackbar} = useSnackbar();
    const setError = (message) => enqueueSnackbar(message, {variant: "error"})
    const setSuccess = (message) => enqueueSnackbar(message, {variant: "success"})
    const [jobs, setJobs] = useState([]);
    const [jobsDisplayed, setJobsDisplayed] = useState([]);

    const discardJob = async (jobId) => {
        const res = await post('/jobs/delete/' + jobId, {}, user.jwt);
        if (res.status === 200){
            let newJobs = JSON.parse(JSON.stringify(jobs));
            newJobs = newJobs.filter(j => j.id !== jobId);
            setJobs(newJobs);
            let newJobsDisplayed = JSON.parse(JSON.stringify(jobsDisplayed));
            newJobsDisplayed = newJobsDisplayed.filter(j => j.id !== jobId);
            setJobsDisplayed(newJobsDisplayed);
            setSuccess("Job deleted");
        }
        else{
            setError("Cannot remove job: " + res.data.message);
        }
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
        <Navbar color="#29B3FF"/>
        <Drawer allJobs={jobs} jobs={jobsDisplayed} setJobs={setJobsDisplayed} />

        <Grid className={classes.margin}
            container
            direction="row"
            justify= "center"
        >
            <Grid container lg={4} xs={6} direction="row" >
                <Typography variant="h5">Total number of jobs: {jobsDisplayed.length}</Typography>
            </Grid>
            <Grid container justify="flex-end"
             lg={7} xs={5} style={{marginBottom: 30}}>
                    <ModalAddJob/>
             </Grid>

            { jobsDisplayed.map(j =>
                <Grid key={j.id} item lg={4} xl={2}>
                    <Card job={j} discardJob={discardJob.bind(null, j.id)}/>
                </Grid>) }
      <Grid item lg={4} xl={2}>
          {/* <CardAddJob/> */}
          <Card/>
      </Grid>
  </Grid>
  </div>
  );
}
