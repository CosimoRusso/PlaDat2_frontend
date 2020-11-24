import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "./components/Navbar";
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Theme, {MuiThemeProvider} from './Theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },

  margin: {
    marginTop: '30px',
  },

  color: {
    background: '#03a9f4',
    '&:hover': {
      background: "#1076a3",
   },
},
margin2: {
  marginTop: '50px',

},
margin3: {
  marginLeft: '20px',
},

margin4: {
  marginBottom: '10px',
},
}));

const Jobs = props => {
  const classes = useStyles();
  return <div className={classes.root}>

      <Navbar/>
      <MuiThemeProvider theme={Theme}>
      <Container fluid className={classes.margin}>
        <Grid container spacing={3}>
      <Grid item xs={6} sm={5} md={3} container>
      <Avatar className={classes.large} variant="square"></Avatar>
</Grid>

<Grid item xs={6} sm={7} md={4}>
<Typography variant="h6">Front-end developer</Typography>
<Typography variant="subtitle1">Netflix | San Francisko</Typography>
      <Typography variant="subtitle1">Salary: 500EUR</Typography>
      <Typography variant="subtitle1">Work: Remote</Typography>
</Grid>
<Grid item xs={4} md={3}>
<Button size="large" variant="contained" color="primary" className={classes.color}>
 Apply now
</Button>
</Grid>
</Grid>
      <Grid item xs={12} md={9}
       container
       direction="column"
       alignItems="left" className={classes.margin2}>
          <Typography variant="h5">Description</Typography>
          <Typography variant="subtitle1" className={classes.margin4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography>
          <Typography variant="h5" className={classes.margin4}>Requirements</Typography>
      </Grid>
      <Chip label="HTML"/>
          <Chip label="CSS" color="primary"  className={classes.margin3} />
          <Chip label="jQuery" className={classes.margin3} />
          <Chip label="Javascript (React or Angular)" className={classes.margin3}/>
      </Container>
      </MuiThemeProvider>
      </div>;
};

export default Jobs;
