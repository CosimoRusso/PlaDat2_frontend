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

export default function SignIn() {
  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
         Company
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
            id="companyname"
            label="Company Name"
            name="companyname"
            autoComplete="companyname"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="companyemail"
            label="Email Address"
            name="companyemail"
            autoComplete="companyemail"
          />

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true, minLength: 8})}
            required
            fullWidth
            name="companypassword"
            label="Password"
            type="password"
            id="companypassword"
            autoComplete="companypassword"
          />

           <TextField
           inputRef={register({required: true})}
          label="Description"
          multiline
          rows={4}
          required
          fullWidth
          name="companydescription"
          id="companydescription"
          autoComplete="companydescription"
          variant="outlined"
        />
          {(errors.companyname && <Typography color="error">Name is required.</Typography>) || (errors.companyemail && <Typography color="error">Email is required.</Typography>) || (errors.companypassword && <Typography color="error">Password must be atleast 8 characters long.</Typography>)}
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