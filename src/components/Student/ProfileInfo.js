import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Date from '../Date';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Theme, {MuiThemeProvider} from '../../Theme';

const BlueRadio = withStyles({
  root: {
    color: 'lightgrey',
    '&$checked': {
      color: '#03a9f4',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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

}));

export default function Edit() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
          <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                className={classes.twofields}
                variant="outlined"
                margin="normal"
                inputRef={register({ required: true })}
                required
                id="firstname"
                value="Oscar"
                label="First Name"
                name="firstname"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({ required: true })}
                required
                id="lastname"
                value="Burek"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register({ required: true })}
              required
              fullWidth
              id="editemail"
              value="oscar@gmail.com"
              label="Email"
              name="editemail"
              autoComplete="editemail"
            />
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                  <FormControlLabel value="female" control={<BlueRadio />} label="Female" />
                  <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Date/>
            </Grid>
            <PhoneInput
             country='it'
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
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
            {(errors.firstname && <Typography color="error">First name is required.</Typography>)
              || (errors.lastname && <Typography color="error">Last name is required.</Typography>)
              || (errors.editemail && <Typography color="error">Email is required.</Typography>)
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