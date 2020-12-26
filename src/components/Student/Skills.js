import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../../Theme';
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";


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

}));



export default function SignIn(props) {
  const classes = useStyles();
  let {skill, onUpdate} = props;
  const {enqueueSnackbar} = useSnackbar();
  const setError = message => enqueueSnackbar(message, {variant: 'error'});
  const {register, handleSubmit, errors} = useForm({
      categoryname: skill.SkillCategory.name,
      skillname: skill.name
  });
  const onSubmit = async data => {
      let rating = parseInt(data.skilllevel);
      if (rating && rating > 0 && rating < 6){
          await onUpdate(skill.id, data.skilllevel)
      }else{
            setError('Rating must be between 1 and 5');
      }

  }

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
         Edit Skill
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

       <TextField value={skill.SkillCategory.name} disabled fullWidth label="Category" variant="outlined" margin="normal" inputRef={register} name="secondaryskill" autoComplete="secondaryskill"/>
        <TextField value={skill.name} disabled fullWidth label="Skill" variant="outlined" margin="normal" inputRef={register} name="secondaryskill"/>


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
            placeholder="From 1 to 5"
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