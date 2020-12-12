import React from 'react';
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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
               <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.skillName}</TableCell>
              <TableCell align="center">{row.level}</TableCell>
              <TableCell align="center"><ModalSkills/></TableCell>
              <TableCell align="center"><DeleteOutlineOutlinedIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
      </div>
      </Grid>
      </div>
  );
}