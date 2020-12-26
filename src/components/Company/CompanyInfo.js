import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Theme, {MuiThemeProvider} from '../../Theme';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../microsoft.png';
import utils from '../../utils';
import { UserContext } from "../../utils/user-context";
import { useSnackbar } from "notistack";

const {post} = utils;


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

  large: {
    width: 100,
    height: 100,
  },

}));

export default function Edit(props) {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const {company, setCompany} = props;
  const { register, handleSubmit, errors } = useForm({defaultValues: {
    name: company.name,
    email: company.email
  }});
  const {enqueueSnackbar} = useSnackbar();
  const onSuccess = (message) => enqueueSnackbar(message, {variant: "success"});
  const onError = (message) => enqueueSnackbar(message, {variant: "error"});


  const onSubmit = async data => {
    const changedFields = {};
    if (data.name !== company.name) changedFields.name = data.name;
    if (data.email !== company.email) changedFields.email = data.email;
    if (changedFields.length === 0){
      onSuccess("Nothing changed")
      return;
    }
    const res = await post(`/company/profile`, changedFields, user.jwt);
    if (res.status !== 200){
      onError(res.data.message);
      return;
    }
    onSuccess('Company Updated!');
    const newCompany = JSON.parse(JSON.stringify(company));
    for (let key of Object.keys(changedFields)){
      newCompany[key] = data[key];
    }
    setCompany(newCompany);
  }



  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Company Information
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

          <Grid container justify="center">
          <Avatar style={{border: "2px solid lightGrey"}} src={logo} className={classes.large}></Avatar>
        </Grid>
        <Typography inputRef={register({required: true})} style={{textAlign: "center", fontSize: 16, color: "#03a9f4"}}>Upload image</Typography>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="name"
            label="Company Name"
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />


{(errors.name && <Typography color="error">Name is required.</Typography>) || (errors.email && <Typography color="error">Email is required.</Typography>)}
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