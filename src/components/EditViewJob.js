import React, {useContext, useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../Theme';
import { useForm } from "react-hook-form";
import utils from "../utils";
import {Autocomplete} from "@material-ui/lab";
import {useSnackbar} from "notistack";
import {Chip, FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {UserContext} from "../utils/user-context";
import Date from './Date';

const {get, post} = utils;

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    color: {
        background: '#03a9f4',
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },


}));

export default function EditViewJob(props) {
    const {job, setJob} = props;
    const [cities, setCities] = useState([]);
    const [skills, setSkills] = useState([]);

    const [remote, setRemote] = useState(job.remote);
    const [partTime, setPartTime] = useState(job.partTime);
    const [timeLimit, setTimeLimit] = useState(job.timeLimit);

    const [city, setCity] = useState(null);
    const [reqSkill, setReqSkill] = useState(null);
    const [optSkill, setOptSkill] = useState(null);
    const {user} = useContext(UserContext);
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const {enqueueSnackbar} = useSnackbar();
    const setError = message => enqueueSnackbar(message, {variant: 'error'});
    const setSuccess = message => enqueueSnackbar(message, {variant: 'success'});
    const dataLoaded = useRef(false);

    const getCopyOfJob = () => JSON.parse(JSON.stringify(job));

    const onSubmit = async data => {
        data.jobId = job.id;
        data.timeLimit=timeLimit;
        if (data.city) data.CityId = cities.find(c => c.name === data.city).id;
        const result = await post('/jobs/update', data, user.jwt);
        if (result.status === 200){
            const res = await get('/jobs/findOne/' + job.id);
            if (res.status === 200){
                setJob(res.data);
                setSuccess('Job Updated!');
            }else{
                setSuccess('Job Updated! Please reload the page');
            }
        }else{
            setError(result.data.message);
        }
    }
    const init = async () => {
        let res = await get("/cities");
        if (res.status === 200){
            setCities(res.data);
            if (job && job.City){
                setCity(res.data.find(c => c.id === job.CityId));
            }
        }else{
            setError("Unable to load cities: " + res.data.message);
        }
    }

    const searchSkills = async (text) => {
        const res = await get('/skills/search/' + text);
        if (res.status === 200){
            setSkills(res.data);
        }
    }

    const addSkill = async (skill, required) =>{
        if (!skill) return;
        const skillType = required ? 'Req' : 'Opt'
        let result = await post(`/jobs/update/${job.id}/add${skillType}/${skill.id}`, {}, user.jwt);
        if (result.status === 200) {
            setSuccess("Skill added");
            const newJob = getCopyOfJob();
            if (required) newJob.requiredSkills.push(skill);
            else newJob.optionalSkills.push(skill);
            setJob(newJob);
            setReqSkill(null);
            setOptSkill(null);
        }
        else {
            setError('Cannot add skill: ' + result.data.message);
        }
    }
    const removeSkill = async (skillId, required) => {
        const skillType = required ? 'Req' : 'Opt'
        let result = await post(`/jobs/update/${job.id}/remove${skillType}/${skillId}`, {}, user.jwt);
        if (result.status === 200){
            setSuccess("Skill removed");
            const newJob = getCopyOfJob();
            if (required)
                newJob.requiredSkills = newJob.requiredSkills.filter(s => s.id !== skillId);
            else
                newJob.optionalSkills = newJob.optionalSkills.filter(s => s.id !== skillId);
            setJob(newJob);
        }else{
            setError('Cannot remove skill: ' + result.data.message);
        }
    }

    useEffect(() => {
        if (dataLoaded.current === false){
            dataLoaded.current = true;
            init().then(() => {});
        }
    })

    return (
        <Container component="main" style={{marginTop: '30px', marginBottom: '30px'}}>
            <MuiThemeProvider theme={Theme}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit Job <b>{job.name}</b>
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            fullWidth
                            id="name"
                            label="Job Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            defaultValue={job.name}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            fullWidth
                            type="number"
                            id="salary"
                            label="Salary"
                            name="salary"
                            autoComplete="salary"
                            defaultValue={job.salary}
                        />
                        <Autocomplete
                            options={cities}
                            getOptionLabel={c => c.name}
                            value={city}
                            onChange={(e, newVal) => setCity(newVal)}
                            renderInput={params => <TextField {...params}
                                                              variant="outlined"
                                                              margin="normal"
                                                              inputRef={register()}
                                                              defaultValue={cities.length && cities[0].name}
                                                              fullWidth
                                                              id="city"
                                                              label="City"
                                                              name="city"
                                                              autoComplete="city"
                            />}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={8}
                            fullWidth
                            inputRef={register()}
                            id="description"
                            label="Description"
                            placeholder="Description"
                            name="description"
                            defaultValue={job.description}
                        />

                        <FormGroup row>
                            <FormControlLabel
                                control={<Switch
                                    checked={remote}
                                    onChange={e => setRemote(e.target.checked)}
                                    inputRef={register()}
                                    name="remote" /> }
                                label={remote ? "Remote" : "In Place"}
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={partTime}
                                    onChange={e => setPartTime(e.target.checked)}
                                    inputRef={register()}
                                    name="partTime" /> }
                                label={partTime ? "Part Time" : "Full Time"}
                            />
                        </FormGroup>
                        <Autocomplete
                            options={skills}
                            getOptionLabel={c => c.name + " - " + c.SkillCategory.name}
                            value={reqSkill}
                            onKeyUp={(e) => searchSkills(e.target.value)}
                            onChange={(e, newVal) => addSkill(newVal, true)}
                            renderInput={params => <TextField {...params}
                                                              variant="outlined"
                                                              margin="normal"
                                                              fullWidth
                                                              id="requiredSkills"
                                                              label="Required Skills"
                                                              name="requiredSkills"
                            />}
                        />
                        {
                            job.requiredSkills.map(s =>
                                <Chip
                                    color='primary'
                                    style={{marginRight: '10px'}}
                                    key={s.id}
                                    label={s.name + " - " + s.SkillCategory.name}
                                    onDelete={() => removeSkill(s.id, true)}
                                />)
                        }

                        <Autocomplete
                            options={skills}
                            getOptionLabel={c => c.name + " - " + c.SkillCategory.name}
                            value={optSkill}
                            onKeyUp={(e) => searchSkills(e.target.value)}
                            onChange={(e, newVal) => addSkill(newVal, false)}
                            renderInput={params => <TextField {...params}
                                                              variant="outlined"
                                                              margin="normal"
                                                              fullWidth
                                                              id="requiredSkills"
                                                              label="Optional Skills"
                                                              name="optionalSkills"
                            />}
                        />
                        {
                            job.optionalSkills.map(s =>
                                <Chip
                                    color='primary'
                                    style={{marginRight: '10px'}}
                                    key={s.id}
                                    label={s.name + " - " + s.SkillCategory.name}
                                    onDelete={() => removeSkill(s.id, false)}
                                />)
                        }
                        <Date
                            value={timeLimit}
                            onChange={setTimeLimit}
                            variant="outlined"
                            margin="normal"
                            rows={8}
                            fullWidth
                            id="timeLimit"
                            label="Time Limit"
                            name="timeLimit"
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop: '30px'}}
                        >
                            Save changes
                        </Button>

                    </form>
                </div>
            </MuiThemeProvider>
        </Container>
    );
}