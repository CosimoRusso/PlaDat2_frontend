import React, {useEffect, useRef, useState} from "react";
import Navbar from "./components/Navbar";
import utils from './utils';
import EditViewJob from './components/EditViewJob';
import {useSnackbar} from "notistack";

const { get } = utils;

export default function EditJob (props) {
    const jobId = props.match.params.jobid;
    const [job, setJob] = useState(null);
    const dataLoaded = useRef(false);
    const {enqueueSnackbar} = useSnackbar();
    const setError = message => enqueueSnackbar(message, {variant: 'error'});
    const setSuccess = message => enqueueSnackbar(message, {variant: 'success'});

    const init = async () => {
        const res = await get(`/jobs/findOne/${jobId}`);
        if (res.status === 200){
            setJob(res.data);
        }else{
            setError("Cannot load job now, try again later. Error: " + res.data.message + " " + jobId);
        }
    }

    useEffect(() => {
        if (dataLoaded.current === false){
            dataLoaded.current = true;
            init().then(() => {});
        }
    })

    return (
        <div>
            <Navbar color="#29B3FF"/>
            {!job && <p>Loading...</p>}
            {job && <EditViewJob job={job} setJob={setJob}/>}
        </div>
    )
}