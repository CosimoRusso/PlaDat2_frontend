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

  color: {
    background: '#03a9f4',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },


}));

export default function EditViewJob() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Job
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="name"
            label="Job Name"
            name="name"
            autoComplete="name"
            autoFocus
          />

<TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            type="number"
            id="salary"
            label="Salary"
            name="salary"
            autoComplete="salary"
          />

<TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
          />

<TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="city"
          />

<TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={8}
                fullWidth
                inputRef={register({ required: true })}
                required
                id="description"
                label="Description"
                placeholder="Description"
                name="description"
              />


{(errors.name && <Typography color="error">Job name is required.</Typography>) || (errors.salary && <Typography color="error">Salary is required.</Typography>) || (errors.location && <Typography color="error">Location is required.</Typography>) || (errors.city && <Typography color="error">City is required.</Typography>) || (errors.description && <Typography color="error">Description is required.</Typography>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Save changes
          </Button>

        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}