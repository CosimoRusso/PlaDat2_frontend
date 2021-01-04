import React, {useContext, useEffect, useRef, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MUIDrawer from './components/ProfileDrawer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Circle from "./components/Student/Circle";
import Grid from '@material-ui/core/Grid';
import ModalSkills from './components/Student/ModalSkills';
import {UserContext} from "./utils/user-context";
import utils from './utils';
import { useSnackbar } from "notistack";
import {Button, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';


const {get, post} = utils;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        width: "100%",
        backgroundColor: "white",
        border: '1px solid lightgrey',
        '@media (min-width:400px)': {
            width: 400,
        },
        '@media (min-width:600px)': {
            width: 550,
        },
        '@media (min-width:960px)': {
            width: 900,
        },
        '@media (min-width:1280px)': {
            width: 1000,

        },
        '@media (min-width:1920px)': {
            width: 1400,
        },
    },
    header:{
        backgroundColor: '#03a9f4',
    },
    divTop: {
        marginLeft: 55,
        marginTop: 110,
    },
    alert: {
        display: 'none',
    },
});

export default function BasicTable(props) {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const studentId = props.match.params.studentId || user.userId;
    const isReadOnly = props.match.params.studentId > 0;
    const [student, setStudent] = useState(null);
    const [alert, setAlert] = useState(false);

    const dataLoaded = useRef(false);
    const [newSkill, setNewSkill] = useState(null);
    const [newSkillList, setNewSkillList] = useState([]);
    const [newSkillRating, setNewSkillRating] = useState(3);
    const {enqueueSnackbar} = useSnackbar();
    const setError = message => enqueueSnackbar(message, {variant: 'error'});
    const setSuccess = message => enqueueSnackbar(message, {variant: 'success'});


    const createSkillSubmit = async () => {
        if (!newSkill) return setError('Please insert the value for the skill');
        if (newSkillRating < 1 || newSkillRating > 5) return setError('Rating must be between 1 and 5');
        const createSkillRes = await post('/student/addCapability', {id: newSkill.id, rating: newSkillRating}, user.jwt);
        if (createSkillRes.status !== 201) return setError(createSkillRes.data.message);
        await loadData();
        setSuccess('Skill Added!');
    }

    const deleteSkill = async (skill) => {
        const skillId = skill.id;
        const res = await post('/student/removeCapability', {removeSkillId: skillId}, user.jwt);
        if (res.status !== 200){
            setError(res.data.message);
            return;
        }
        setSuccess('Capability removed');
        const newStudent = JSON.parse(JSON.stringify(student));
        newStudent.skills = newStudent.skills.filter(s => s.id !== skillId);
        setStudent(newStudent);
    }

    const onSkillUpdate = async (skillId, newRating) => {
        const updateSkillRes = await post('/student/editCapability', {
            id: skillId,
            rating: newRating
        }, user.jwt);
        if (updateSkillRes.status !== 201){
            setError(updateSkillRes.data.message);
        }else{
            setSuccess('Skill Updated!');
            const newStudent = JSON.parse(JSON.stringify(student));
            newStudent.skills.map(s => {
                if(s.id === skillId) s.StudentSkill.rating = parseInt(newRating);
                return s;
            });
            setStudent(newStudent);
        }
    }

    const loadData = async () => {
        const studentRes = await get(`/student/findOne/${studentId}`);
        if (studentRes.status !== 200){
            setError(studentRes.data.message);
        }else{
            setStudent(studentRes.data);
        }
    }

    const onSearchSkill = async (text) => {
        if(newSkill) return;
        setAlert(false);
        if (text.length === 0) setNewSkillList([]);
        const res = await get('/skills/search/' + text);
        if (res.status === 200){
            setNewSkillList(res.data);
        }else{
            setError(res.data.message);
        }
    }

    const getLevelDescription = (skill) => {
        if (skill && skill.SkillCategory && skill.SkillCategory.LevelDescriptions && skill.SkillCategory.LevelDescriptions.length){
            const levels = skill.SkillCategory.LevelDescriptions;
            const level =  levels.find(x => x.level === newSkillRating);
            if (level) return level.description;
        }
        return "Invalid Level";
    }

    const onLevelChange = (newLevel) => {
        if (newSkill === null) return setError("Please select a Skill first");
        const levels = newSkill.SkillCategory.LevelDescriptions;
        const levelsInt = levels.map(x => parseInt(x.level));
        const min = Math.min.apply(Math, levelsInt);
        const max = Math.max.apply(Math, levelsInt);
        if (newLevel < min) return setError("This is the minimum level for this skill");
        if (newLevel > max) return setError("This is the maximum level for this skill");
        setNewSkillRating(parseInt(newLevel));
    }

    useEffect(() => {
        if (!dataLoaded.current){
            dataLoaded.current = true;
            loadData().then(() => {});
        }
    })


    return (
        <div>

            <Grid lg={12} xs={12} md={12} sm={12} container direction="row" justify="center" justifyContent="center" >
                <div className={classes.divTop}>
                    <Grid item xs={2} sm={2} md={2} lg={2} >
                        <MUIDrawer studentId={isReadOnly && studentId}/>
                    </Grid>
                    <div>
                        {
                            alert?  <Alert variant="filled" severity="info">
                                <AlertTitle>Level {newSkillRating}</AlertTitle>
                                {getLevelDescription(newSkill)}
                                <Button onClick={()=>{setAlert(false)}} style={{display: 'block', marginTop: 10, backgroundColor: "lightGrey" }}  variant="contained">Accept level</Button>
                            </Alert> : null
                        }

                    </div>
                    {!isReadOnly && <Grid item lg={12} xs={10} md={10} sm={10}>
                        <Table className={classes.table} aria-label='create skill table'>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Autocomplete
                                            id="new-skill-name"
                                            value={newSkill}
                                            fullWidth
                                            onKeyUp={e => onSearchSkill(e.target.value)}
                                            onChange={(e, newVal) => setNewSkill(newVal)}
                                            options={newSkillList}
                                            getOptionLabel={(skill) => skill.name + " - " + skill.SkillCategory.name}
                                            renderInput={(params) => <TextField {...params} label="Choose the new skill" variant="outlined" required margin="normal" autoFocus name="newSkill" />}
                                        />
                                    </TableCell>
                                    <TableCell align="right" style={{maxWidth: '50px', textAlign: "center"}}>
                                        <TextField
                                            onClick={()=>{setAlert(true)}}
                                            value={newSkillRating}
                                            onChange={e => onLevelChange(e.target.value)}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="newSkillRating"
                                            label="Rating"
                                            name="newSkillRating"
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell align="right" style={{maxWidth: '50px', textAlign: "center"}}>
                                        <Button variant="contained" style={{backgroundColor: "#03a9f4", color: "white"}} onClick={createSkillSubmit}>Create</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>}
                    <Grid item lg={12} xs={10} md={10} sm={10}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Skill</StyledTableCell>
                                    <StyledTableCell align="center">Level</StyledTableCell>
                                    {!isReadOnly && <StyledTableCell align="center">Edit</StyledTableCell>}
                                    {!isReadOnly && <StyledTableCell align="center">Delete</StyledTableCell>}
                                </TableRow>
                            </TableHead>
                            {student &&
                            <TableBody>
                                {student.skills.map((skill) => (
                                    <TableRow key={skill.id}>
                                        <TableCell align="center">{ skill.SkillCategory ? skill.SkillCategory.name : 'No Category'}</TableCell>
                                        <TableCell align="center">{skill.name}</TableCell>
                                        <TableCell align="center"><Circle value={skill.StudentSkill.rating} /> </TableCell>

                                        {!isReadOnly && <TableCell align="center"><ModalSkills skill={skill} onUpdate={onSkillUpdate}/></TableCell>}
                                        {!isReadOnly && <TableCell align="center"><DeleteOutlineOutlinedIcon
                                            onClick={deleteSkill.bind(null, skill)}/></TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                            }
                        </Table>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}