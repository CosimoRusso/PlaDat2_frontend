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
import CustomizedSnackbars from "./components/CustomSnackbar";

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
});

function createData(category, skillName, level) {
  return { category, skillName, level };
}

const rows = [
  createData('Programming', 'React', <Circle/>),
  createData('Marketing', 'SEO', <Circle/>),
  createData('Economy', 'Economic Consultant', <Circle/>),
  createData('Programming', 'MySQL', <Circle/>),
  createData('Programming', 'Java', <Circle/>),
];

export default function BasicTable() {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const studentId = user.userId;
  const [student, setStudent] = useState(null);
  const [showAlert, setShowAlert] = useState({type: 'error', message: ''});
  const setError = message => setShowAlert({type: 'error', message});
  const setSuccess = message => setShowAlert({type: 'success', message});
  const dataLoaded = useRef(false);

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

  const loadData = async () => {
    const studentRes = await get(`/student/findOne/${studentId}`);
    if (studentRes.status !== 200){
        setError(studentRes.data.message);
        return;
    }
    setStudent(studentRes.data);
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
            <MUIDrawer/>
            </Grid>

              <Grid item lg={12} xs={10} md={10} sm={10}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.header}>
          <TableRow>
          <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Skill</StyledTableCell>
            <StyledTableCell align="center">Level</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
          {student &&
          <TableBody>
              {student.skills.map((skill) => (
                  <TableRow key={skill.id}>
                      <TableCell align="center">{ skill.SkillCategory ? skill.SkillCategory.name : 'No Category'}</TableCell>
                      <TableCell align="center">{skill.name}</TableCell>
                      <TableCell align="center"><Circle value={skill.StudentSkill.rating} /> </TableCell>
                      <TableCell align="center"><ModalSkills/></TableCell>
                      <TableCell align="center"><DeleteOutlineOutlinedIcon onClick={deleteSkill.bind(null, skill)}/></TableCell>
                  </TableRow>
              ))}
          </TableBody>
          }
      </Table>
      </Grid>
      </div>
      </Grid>
          <CustomizedSnackbars type={showAlert.type} message={showAlert.message} setMessage={setShowAlert} />
      </div>
  );
}