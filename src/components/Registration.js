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


function getSteps() {
  return ['Student information', 'Skill information', 'Other information'];
}

export default function HorizontalLabelPositionBelowStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
   return <div >
   <MuiThemeProvider theme={Theme}>
      <CssBaseline />
          <form  noValidate>
          <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="surname"
      label="Surname"
      name="surname"
      autoComplete="surname"
      autoFocus
    />
          <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
    </form>
    </MuiThemeProvider>
    </div>;
    case 1:
      return <div>
      <MuiThemeProvider theme={Theme}>
         <CssBaseline />
             <form noValidate>
             <Autocomplete
      id="skill"
      options={skills}
      getOptionLabel={(skill) => skill.title}
      renderInput={(params) => <TextField {...params} label="Choose your primary skill" variant="outlined" required margin="normal"
/>}
    />
           <Autocomplete
      id="skill"
      options={skills}
      getOptionLabel={(skill) => skill.title}
      renderInput={(params) => <TextField {...params} label="Choose your secondary skill (optional)" variant="outlined" margin="normal"
 />}
    />
     <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="otherskill"
      label="Write other skill (optional)"
      name="otherskill"
      autoComplete="otherskill"
      autoFocus
    />
             </form>
    </MuiThemeProvider>
    </div>;
    case 2:
      return <div>
      <MuiThemeProvider theme={Theme}>
         <CssBaseline />
             <form noValidate>
             <TextField
         variant="outlined"
         margin="normal"
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
         fullWidth
         id="city"
         label="City (optional)"
         name="city"
         autoComplete="city"
         autoFocus
       />
       <Date/>
       </form>
       </MuiThemeProvider>
       </div>;;
    default:
      return 'Unknown stepIndex';
  }
}

const skills = [
    { title: 'Java', id: 1 },
    { title: 'JavaScript', id: 2 },
    { title: 'HTML', id: 3 },
    { title: 'CSS', id: 4},
    { title: 'C#', id: 5 },
    { title: "Python", id: 6 },
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
              <Button variant="contained" color="primary" onClick={handleNext}>
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