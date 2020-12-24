import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Date from '../Date';
import Theme, {MuiThemeProvider} from '../../Theme';



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

export default function Edit() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Job Experience
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                inputRef={register({ required: true })}
                required
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({ required: true })}
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
              />
            <Grid item xs={6}>
              <TextField
                className={classes.twofields}
                variant="outlined"
                margin="normal"
                name="city"
                label="City"
                id="city"
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                name="country"
                label="Country"
                id="country"
                autoComplete="country"
              />
            </Grid>

            <Grid item xs={5} className={classes.threefields}>
             <Typography>From</Typography> <Date />
            </Grid>
            <Grid item xs={5}>
            <Typography>To</Typography> <Date/>
            </Grid>
            {(errors.company && <Typography color="error">Company is required.</Typography>)
              || (errors.role && <Typography color="error">Role is required.</Typography>)
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