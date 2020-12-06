import React from 'react';
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


function getSteps() {
  return ['Student information', 'Skill information', 'Other information'];
}

export default function HorizontalLabelPositionBelowStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
      console.log(data);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      inputRef={register({required: true})}
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      autoFocus
    />
     {errors.name && <p>Name is required.</p>}
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={register({required: true})}
      required
      fullWidth
      id="surname"
      label="Surname"
      name="surname"
      autoComplete="surname"
    />
     {errors.surname && <p>Surname is required.</p>}
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
    {errors.email && <p>Email is required.</p>}
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
          {errors.password && <p>Password must be atleast 8 characters long.</p>}
    </div>;
    case 1:
      return <div>
         <CssBaseline />
             <Autocomplete
      id="skill"
      options={skills}
      getOptionLabel={(skill) => skill.title}
      renderInput={(params) => <TextField {...params} label="Choose your primary skill" variant="outlined" required margin="normal" autoFocus inputRef={register({required: true})} name="primaryskill" autoComplete="primaryskill"
/>}
    />
    {errors.primaryskill && <p>Primary skill is required.</p>}
           <Autocomplete
      id="secondskill"
      options={skills}
      getOptionLabel={(skill) => skill.title}
      renderInput={(params) => <TextField {...params} label="Choose your secondary skill (optional)" variant="outlined" margin="normal" inputRef={register} name="secondaryskill" autoComplete="secondaryskill"
 />}
    />
    </div>;
    case 2:
      return <div>
         <CssBaseline />
             <TextField
         variant="outlined"
         margin="normal"
         inputRef={register}
         fullWidth
         id="country"
         label="Country (optional)"
         name="country"
         autoComplete="country"
         autoFocus
       />
       <TextField
         variant="outlined"
         margin="normal"
         inputRef={register}
         fullWidth
         id="city"
         label="City (optional)"
         name="city"
         autoComplete="city"
       />
       <Date/>
       </div>;
    default:
      return 'Unknown stepIndex';
  }
}

const skills = [
    { title: 'Java'},
    { title: 'JavaScript'},
    { title: 'HTML'},
    { title: 'CSS'},
    { title: 'C#'},
    { title: 'Python'},
];

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
            <Typography >Successfully registration</Typography>
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