import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import {UserContext} from "./utils/user-context";
import utils from './utils';

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

    const discardJob = async (jobId) => {
      const {status, data} = await post('/student/jobs/discard/' + jobId, {}, user.jwt);
      if (status === 201){
        setJobs(jobs.filter(j => j.id !== jobId));
      }else{
        alert(data.message);
      }
    }

    useEffect(() => {
      async function fetchData(){
        const { status, message, data } = await utils.get('/student/jobs/search', null, user.jwt);
        if (status !== 200) {
          if (message)
            alert('Error: ' + message);
          else
            alert('Server is currently offline, please try again later');
          return;
        }
        for (let job of data){
          const { data } = await utils.get('/company/findOne/' + job.CompanyId);
          job.company = data;
        }
        setJobs(data);
      }
      return fetchData();
    }, [])

    return (

    <div className={classes.root}>
      <Navbar/>
<Drawer/>
      <Grid className={classes.margin}
  container
  direction="row"
  justify= "center"
>
  {jobs.map( job =>
      <Grid item lg={4} xl={2}  key={job.id}>
        <Card job={job} discardJob={discardJob}/>
      </Grid>
  )}
  </Grid>
  </div>
  );
}


