import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../../Theme';
import { useForm } from "react-hook-form";
import utils from '../../utils';
import {UserContext} from "../../utils/user-context";
import {useSnackbar} from "notistack";
import history from "../../history";

const { post } = utils;

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
    width: '110%',
    marginTop: theme.spacing(1),
  },


}));

export default function EditViewJob() {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const {enqueueSnackbar} = useSnackbar();
  const onSuccess = (message) => enqueueSnackbar(message, {variant: "success"});
  const onError = (message) => enqueueSnackbar(message, {variant: "error"});
  const onSubmit = async data => {
    const res = await post('/jobs', data, user.jwt);
    if (res.status === 200){
        onSuccess("Job Created");
        history.push("/viewjob/"+res.data.id);
    }else{
        onError(res.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Add New Job
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="name"
            label="Job Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            fullWidth
            id="name"
            label="Description"
            name="description"
            autoComplete="description"
            autoFocus
        />


{(errors.name && <Typography color="error">Job name is required.</Typography>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Add Job
          </Button>

        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}