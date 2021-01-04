import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Theme, {MuiThemeProvider} from '../../Theme';
import utils from '../../utils';
import {UserContext} from "../../utils/user-context";
import {useSnackbar} from "notistack";

const {post} = utils;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  twofields: {
    marginRight: 10
  },
  threefields: {
    marginRight: 40
  },

}));

export default function Edit(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const {student, setStudent} = props;
  const {user} = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  const setError = message => enqueueSnackbar(message, {variant: 'error'});
  const setSuccess = message => enqueueSnackbar(message, {variant: 'success'});

  const onSubmit = async data => {
    const res = await post('/student/profile', data, user.jwt);
    if(res.status === 200){
      setSuccess('Description Updated!');
      const newStudent = JSON.parse(JSON.stringify(student));
      newStudent.description = data.description;
      setStudent(newStudent);
    }else{
      setError(res.data.message);
    }
  }


  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Education
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container xs={12}>
          <TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={8}
                fullWidth
                inputRef={register()}
                required
                id="description"
                label="Description"
                placeholder="Description"
                name="description"
                defaultValue={student.description}
              />

            {(errors.institution && <Typography color="error">Institution is required.</Typography>)
              || (errors.acquiredtitle && <Typography color="error">Acquired title is required.</Typography>)
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Save changes
          </Button>
          </Grid>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}