import React, {useContext, useState} from 'react';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../Theme';
import utils from '../utils';
import {UserContext} from "../utils/user-context";
import MenuItem from '@material-ui/core/MenuItem';
import ModalUser from "./ModalUser";


const { post } = utils;

const user = [
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'company',
    label: 'Company',
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
  const [email, setEmail] = useState(process.env.REACT_APP_EMAIL || "");
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD || "");
  const { setUser } = useContext(UserContext);
  const [usertype, setUserType] = React.useState('student');

  const handleChange = (event) => {
    const type = event.target.value;
    setUserType(type);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (e.target.id !== "login-form") {
      return false;
    }
    const { status, data } = await post(`/${usertype}/login`, { email, password });
    if (status !== 200) {
      alert("Error: " + data.message);
    }else{
      const userData = { jwt: data.jwt, userId: data.id, userType: 'student'};
      utils.setSessionCookies(userData.jwt, userData.userId, userData.userType);
      setUser(userData);
      history.push("/dashboard");
    }
    return false;
  }

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
         Login
        </Typography>
        <form id={"login-form"} className={classes.form} noValidate onSubmit={onFormSubmit}>
        <TextField
          id="usertype"
          select
          variant="outlined"
          margin="normal"
          required
          fullWidth
          placeholder = "Select user type"
          value={usertype}
          onChange={handleChange}

        >
          {user.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
              <ModalUser/>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}