import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../../Theme';
import { useForm } from "react-hook-form";
import Autocomplete from '@material-ui/lab/Autocomplete';



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

}));

const categories = [
  { title: 'Programming'},
  { title: 'Marketing'},
  { title: 'Economy'},
  { title: 'Security'},

];

const skills = [
  { title: 'Java'},
  { title: 'JavaScript'},
  { title: 'HTML'},
  { title: 'CSS'},
  { title: 'C#'},
  { title: 'Python'},
];

export default function SignIn() {
  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
         Edit Skill
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

        <Autocomplete
      id="categoryname"
      name="categoryname"
      options={categories}
      getOptionLabel={(category) => category.title}
      renderInput={(params) => <TextField {...params} label="Choose category" variant="outlined" margin="normal" inputRef={register} name="secondaryskill" autoComplete="secondaryskill"
 />}
    />
        <Autocomplete
      id="skillname"
      name="skillname"
      options={skills}
      getOptionLabel={(skill) => skill.title}
      renderInput={(params) => <TextField {...params} label="Choose your skill" variant="outlined" margin="normal" inputRef={register} name="secondaryskill" autoComplete="secondaryskill"
 />}
    />


          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="skilllevel"
            label="Level"
            name="skilllevel"
            type="number"
            autoComplete="skilllevel"
            placeholder="From 1 to 100"
          />


          {(errors.categoryname && <Typography color="error">Category is required.</Typography>) || (errors.skillname && <Typography color="error">Skill name is required.</Typography>) || (errors.skillevel && <Typography color="error">Skill level is required.</Typography>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
           Save Changes
          </Button>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}