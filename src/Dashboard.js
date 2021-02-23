import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import {UserContext} from "./utils/user-context";
import utils from './utils';
import { useSnackbar } from "notistack";

const { post } = utils;

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
    const { user } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [jobsDisplayed, setJobsDisplayed] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const onError = (text) => enqueueSnackbar(text, {variant: "error"});

    const discardJob = async (jobId) => {
      const {status, data} = await post('/student/jobs/discard/' + jobId, {}, user.jwt);
      if (status === 201){
        setJobs(jobs.filter(j => j.id !== jobId));
        setJobsDisplayed(jobsDisplayed.filter(j => j.id !== jobId));
      }else{
        onError(data.message);
      }
    }

    useEffect(() => {
      async function fetchData(){
        const { status, data } = await utils.get('/student/jobs/search', null, user.jwt);
        if (status !== 200) {
          if (data.message)
            onError(data.message);
          else
            onError('Server is currently offline, please try again later');
          return;
        }
        for (let job of data){
          const { data } = await utils.get('/jobs/findOne/' + job.id);
          job.Company = data.Company;
          job.City = data.City;
        }
        setJobs(data);
        setJobsDisplayed(data);
      }
      return fetchData();
      // eslint-disable-next-line
    }, [])

    return (

    <div className={classes.root}>
 <Navbar color="#29B3FF"/>
<Drawer allJobs={jobs} jobs={jobsDisplayed} setJobs={setJobsDisplayed} />
      <Grid className={classes.margin}
  container
  direction="row"
  justify= "center"
>
  {jobsDisplayed.map( job =>
      <Grid item lg={4} xl={2}  key={job.id}>
        <Card job={job} discardJob={discardJob}/>
      </Grid>
  )}
        {jobsDisplayed.length === 0 && <p>Sorry, Nothing to show here. Try <a href={"/student/skills"}>adding more skills</a></p>}
  </Grid>
  </div>
  );
}


