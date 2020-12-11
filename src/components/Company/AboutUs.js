import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Theme, {MuiThemeProvider} from '../../Theme';



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
          Edit About Us
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
              <TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={10}
                fullWidth
                inputRef={register({ required: true })}
                required
                id="aboutus"
                label="About Us"
                placeholder="Description"
                name="aboutus"
                autoFocus
              />

            {(errors.aboutus && <Typography color="error">About Us is required.</Typography>) }
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