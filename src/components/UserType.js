import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../Theme';
import ModalStudent from "./ModalStudent"
import ModalCompany from "./ModalCompany"
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
   color: {
    background: '#03a9f4',
  },
  large: {
    width: 80,
    height: 80,

  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 3),
  },
}));

export default function SignIn() {
  const classes = useStyles();


  return (
    <Container component="main" maxWidth="md">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
          <br></br>
        <Typography component="h1" variant="h4">
         Choose User
        </Typography>
        <div className={classes.root}>
        <Grid container direction="row"
  justify="center"
  alignItems="center"
>
<ModalStudent/>
<ModalCompany/>
</Grid>
</div>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}