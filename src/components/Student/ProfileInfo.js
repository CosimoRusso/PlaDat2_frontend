import React, {useContext, useEffect} from 'react';
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import utils from '../../utils';
import {UserContext} from "../../utils/user-context";
import { useSnackbar } from "notistack";

const {get, post} = utils;
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

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  twofields: {
    marginRight: 10
  },

}));

export default function Edit(props) {
  const classes = useStyles();
  const {user} = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm();
  const [userData, setUserdata] = React.useState(props.userData);
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState(null);
  const [cities, setCities] = React.useState([]);
  const [city, setCity] = React.useState(null);
  const {enqueueSnackbar} = useSnackbar();

  const setSuccess = message => enqueueSnackbar(message, {variant: 'success'});
  const setError = message => enqueueSnackbar(message, {variant: 'error'});

  const onSubmit = async () => {
    const fields = ['firstName', 'lastName', 'email', 'dateOfBirth', 'CityId'];
    const changedFields = [];
    for (let key of Object.keys(props.userData)){
      if (fields.includes(key) && props.userData[key] !== userData[key]){
        changedFields.push(key);
      }
    }
    if (!changedFields.length){
      setSuccess('Update Successful');
      return;
    }
    const obj = {};
    for (let key of changedFields) obj[key] = userData[key];
    const {data, status} = await post('/student/profile', obj, user.jwt );
    if (status !== 200){
      setError(data.message);
    }else{
      setSuccess('Update Successful!');
    }
  }

  const updateCountry = (newCountry) =>{
    setCountry(newCountry);
    setCity(null);
  }

  const updateCity = (newCity) => {
    setCity(newCity);
    if (newCity){
      let obj = JSON.parse(JSON.stringify(userData));
      obj.CityId = newCity.id;
      setUserdata(obj);
    }
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await get('/countries');
      if (res.status === 200){
        setCountries(res.data);
        if (userData.country)
          setCountry(res.data.find(c => c.name === userData.country));
      }else{
        setError(res.data.message);
      }
    }
    const fetchCities = async() => {
      const res = await get('/cities');
      if (res.status === 200){
        setCities(res.data);
        if (userData.city)
          setCity(res.data.find(c => c.name === userData.city));
      }else{
        setError(res.data.message);
      }
    }
    return Promise.all([fetchCountries(), fetchCities()]);
    // eslint-disable-next-line
  }, [])

  function updateField(field, value){
    const obj = JSON.parse(JSON.stringify(userData));
    obj[field] = value;
    setUserdata(obj);
  }

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
                value={userData.firstName}
                onChange={e => updateField("firstName", e.target.value)}
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
                value={userData.lastName}
                onChange={e => updateField("lastName", e.target.value)}
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
              value={userData.email}
              onChange={e => updateField("email", e.target.value)}
              label="Email"
              name="editemail"
              autoComplete="editemail"
            />
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={userData.gender} onChange={e => updateField("gender", e.target.value)}>
                  <FormControlLabel value="female" control={<BlueRadio />} label="Female" />
                  <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Date value={userData.dateOfBirth} onChange={e => updateField("dateOfBirth", e.target.value)}/>
            </Grid>
            <PhoneInput
             country='it'
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
             value={userData.phone}
             onChange={e => updateField("phone", e.target.value)}
            />
            <Grid item xs={6}>
              <Autocomplete
                  className={classes.twofields}
                  id="country"
                  options={countries}
                  value={country}
                  onChange={(e, newVal) => {
                    updateCountry(newVal);
                  }}
                  getOptionLabel={(country) => country.name}
                  renderInput={(params) => <TextField {...params} label="Choose your Country" variant="outlined" margin="normal" name="country" autoComplete="country" />}
              />

            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                  id="city"
                  options={cities.filter(c => country && (c.CountryId === country.id))}
                  value={city}
                  onChange={(e, newVal) => updateCity(newVal)}
                  getOptionLabel={(city) => city.name}
                  renderInput={(params) => <TextField {...params} label="City" variant="outlined" margin="normal" name="city" autoComplete="" />}
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