import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../Theme';
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


export default function Message() {
  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>

        <form id={"register-company-form"} className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="subject"
            label="Subject"
            name="subject"
            autoComplete="subject"
            autoFocus
          />

           <TextField
           inputRef={register({required: true})}
          label="Message"
          multiline
          rows={7}
          required
          fullWidth
          name="message"
          id="message"
          autoComplete="mesagge"
          variant="outlined"
          style={{marginBottom: 20}}
        />
          {(errors.subject && <Typography color="error">Subject is required.</Typography>) || (errors.message && <Typography color="error">Message is required.</Typography>)}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
           Send Message
          </Button>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}