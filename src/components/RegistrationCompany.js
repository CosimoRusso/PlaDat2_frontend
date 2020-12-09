import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Theme, {MuiThemeProvider} from '../Theme';
import Grid from '@material-ui/core/Grid';
import BusinessCenterRounded from '@material-ui/icons/BusinessCenterRounded';
import { useForm } from "react-hook-form";
import utils from "../utils/";

const { post } = utils;

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

}));

const env = (field) => {
    return process.env[`REACT_APP_COMPANY_REGISTRATION_${field.toUpperCase()}`] || '';
}

export default function SignIn() {
  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm({
      defaultValues: {
        name: env('name'),
        email: env('email'),
        password: env('password'),
        description: env('description')
      }
  });
  const onSubmit = async company => {
      const { status, data } = await post('/company/register', company);
      if (status === 201){
          alert("Success");
      }else{
          alert("Error: " + data.message);
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
         Company
        </Typography>
        <form id={"register-company-form"} className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container justify="center" >
        <Avatar className={classes.large} alt="Company logo"><BusinessCenterRounded color="inherit" fontSize="large"/></Avatar>
        </Grid>
        <Typography inputRef={register({required: true})} style={{textAlign: "center", fontSize: 16, color: "#03a9f4"}}>Upload image</Typography>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="name"
            label="Company Name"
            name="name"
            autoComplete="name"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true, minLength: 8})}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />

           <TextField
           inputRef={register({required: true})}
          label="Description"
          multiline
          rows={4}
          required
          fullWidth
          name="description"
          id="description"
          autoComplete="description"
          variant="outlined"
        />
          {(errors.name && <Typography color="error">Name is required.</Typography>) || (errors.email && <Typography color="error">Email is required.</Typography>) || (errors.password && <Typography color="error">Password must be atleast 8 characters long.</Typography>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
           Register
          </Button>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}