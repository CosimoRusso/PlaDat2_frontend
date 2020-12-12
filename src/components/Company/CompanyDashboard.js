import React, {useContext, useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./../Navbar";
import Drawer from "./../Drawer";
import Card from './Card';
import { UserContext } from "../../utils/user-context";
import utils from '../../utils';
import CustomizedSnackbars from "../CustomSnackbar";

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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [jobs, setJobs] = useState([]);
    const [jobsDisplayed, setJobsDisplayed] = useState([]);

    const fetchJobs = async () => {
        const companyId = user.userId;
        const companyRes = await get('/company/findOne/' + companyId);
        if (companyRes.status !== 200){
            setError('Cannot load jobs: ' + companyRes.data.message);
            return;
        }
        for (let job of companyRes.data.Jobs){
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
        <Drawer/>
        <Grid className={classes.margin}
            container
            direction="row"
            justify= "center"
        >
            { jobsDisplayed.map(j =>
                <Grid key={j.id} item lg={4} xl={2}>
                    <Card job={j}/>
                </Grid>) }
      <Grid item lg={4} xl={2}>
          {/* <CardAddJob/> */}
          <Card/>
      </Grid>
  </Grid>
    <CustomizedSnackbars type={"error"} message={error} />
    <CustomizedSnackbars type={"success"} message={success} />
  </div>
  );
}


