import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Theme, {MuiThemeProvider} from '../../Theme';
import {UserContext} from "../../utils/user-context";
import utils from '../../utils';
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


}));

export default function Edit(props) {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const {company, setCompany} = props;
  const {enqueueSnackbar} = useSnackbar();
  const onError = (message) => enqueueSnackbar(message, {variant: "error"});
  const onSuccess = (message) => enqueueSnackbar(message, {variant: "success"});
  const { register, handleSubmit, errors } = useForm({ defaultValues:{
    aboutus: company.description
    }});

  const onSubmit = async data => {
    if (company.description !== data.aboutus){
      const res = await post('/company/profile', {description: data.aboutus}, user.jwt);
      if (res.status !== 200){
        onError(res.data.message);
      }else{
        onSuccess('Company updated!');
        const newCompany = JSON.parse(JSON.stringify(company));
        newCompany.description = data.aboutus;
        setCompany(newCompany);
      }
    }else{
      onSuccess('Nothing changed');
    }
  }


  return (
    <Container component="main" maxWidth="xs">
       <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit About Us
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
              <TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={10}
                fullWidth
                inputRef={register({ required: true })}
                required
                id="aboutus"
                label="About Us"
                placeholder="Description"
                name="aboutus"
                autoFocus
              />

            {(errors.aboutus && <Typography color="error">About Us is required.</Typography>) }
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