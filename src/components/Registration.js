import React, {useEffect, useState} from 'react';
import Theme, {MuiThemeProvider} from '../Theme';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Date from './Date';
import { useForm } from "react-hook-form";
import utils from '../utils';

const { get, post } = utils;


function getSteps() {
  return ['Student information', 'Skill information', 'Other information'];
}

const env = (field) => {
    return process.env[`REACT_APP_REGISTRATION_${field.toUpperCase()}`] || '';
}

export default function HorizontalLabelPositionBelowStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const [error, setError] = React.useState({});
    const [name, setName] = React.useState(env('name'));
    const [surname, setSurname] = React.useState(env('surname'));
    const [email, setEmail] = React.useState(env('email'));
    const [password, setPassword] = React.useState(env('password'));
    const [primarySkill, setPrimarySkill] = React.useState(null);
    const [secondarySkill, setSecondarySkill] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [birthDate, setBirthDate] = React.useState();

    const steps = getSteps();
    const {handleSubmit} = useForm({defaultValues: {
        name,
        surname,
        email,
        password,
    }});
    const [skills, setSkills] = useState([]);
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // fetch skills
            get('/skills').then(({data, status, message}) => {
                if (status !== 200){
                    setSkills([{name: 'Angular', id: 1}]);
                    alert('Error while fetching skills: '+message+' you can still have some example ones');
                } else{
                    setSkills(data);
                }
            });

            // fetch countries
            get('/countries').then(({data, status, message}) => {
                if (status !== 200){
                    setCountries([{name: 'Italy', id: 111}]);
                    alert('Error while fetching countries: '+message+' you can still have some example ones');
                } else{
                    setCountries(data);
                }
            });

            // fetch cities
            get('/cities').then(({data, status, message}) => {
                if (status !== 200){
                    setCities([{name: 'Milan', id: 1}]);
                    alert('Error while fetching cities: '+message+' you can still have some example ones');
                } else{
                    setCities(data);
                }
            });
        }
        return fetchData();
        // eslint-disable-next-line
    }, [])

    const onSubmit = async () => {
        let e = {};
      if (activeStep === 0){
          if (!name) e.name = 'Name is required';
          if (!surname) e.surname = 'Surname is required';
          if (!email) e.email = 'Email is required';
          if (password.length < 8) e.password = 'Password must be at least 8 characters';
      }else if (activeStep === 1){
          if(!primarySkill) e.primarySkill = 'At least the primary skill is required';
      }else if (activeStep === 2){
          const {status, data} = await post('/student/register', {
            firstName: name,
            lastName: surname,
            email,
            password,
            dateOfBirth: birthDate,
            CityId: city && city.id
          });
          if (status !== 201) {
              e.finalMessage = data.message;
          }
      }
      setError(e);
      if (Object.keys(e).length === 0){
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
   return <div>
      <CssBaseline />
          <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      value={name}
      onChange={e => setName(e.target.value)}
      autoFocus
    />
     {error.name && <p>Name is required.</p>}
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="surname"
      label="Surname"
      value={surname}
      onChange={(e) => setSurname(e.target.value)}
      name="surname"
      autoComplete="surname"
    />
     {error.surname && <p>Surname is required.</p>}
          <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      name="email"
      autoComplete="email"
    />
    {error.email && <p>Email is required.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="password"
          />
          {error.password && <p>Password must be at least 8 characters long.</p>}
    </div>;
    case 1:
      return <div>
         <CssBaseline />
             <Autocomplete
      id="skill"
      value={primarySkill}
      onChange={(e, newVal) => setPrimarySkill(newVal)}
      options={skills}
      getOptionLabel={(skill) => skill.name}
      renderInput={(params) => <TextField {...params} label="Choose your primary skill" variant="outlined" required margin="normal" autoFocus name="primaryskill" autoComplete="primaryskill" />}
    />
    {error.primarySkill && <p>Primary skill is required.</p>}
    <Autocomplete
      id="secondskill"
      options={skills}
      value={secondarySkill}
      onChange={(e, newVal) => setSecondarySkill(newVal)}
      getOptionLabel={(skill) => skill.name}
      renderInput={(params) => <TextField {...params} label="Choose your secondary skill (optional)" variant="outlined" margin="normal" name="secondaryskill" autoComplete="secondaryskill" />}
    />

    </div>;
    case 2:
      return <div>
         <CssBaseline />
          <Autocomplete
              id="country"
              options={countries}
              value={country}
              onChange={(e, newVal) => setCountry(newVal)}
              getOptionLabel={(country) => country.name}
              renderInput={(params) => <TextField {...params} label="Choose your Country" variant="outlined" margin="normal" name="country" autoComplete="country" />}
          />
          <Autocomplete
              id="city"
              options={cities}
              getOptionLabel={(c) => c.name}
              value={city}
              onChange={(e, newVal) => setCity(newVal)}
              renderInput={(params) => <TextField {...params} label="Choose your City" variant="outlined" margin="normal" name="city" autoComplete="city" />}
          />
       <Date value={birthDate} onChange={d => setBirthDate(d) }/>
       <p>{error.finalMessage}</p>
       </div>;
    default:
      return 'Unknown stepIndex';
  }
}

  return (
    <MuiThemeProvider theme={Theme}>
    <Container component="main" maxWidth="sm">
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >Successfully registered</Typography>
          </div>
        ) : (
          <div>
            <Typography >{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </Container>
    </MuiThemeProvider>
  );
}