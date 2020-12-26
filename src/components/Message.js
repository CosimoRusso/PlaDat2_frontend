import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../Theme';
import { useForm } from "react-hook-form";
import { UserContext } from "../utils/user-context";
import { useSnackbar } from "notistack";
import utils from "../utils";

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


export default function Message(props) {
    const classes = useStyles();
    const {register, handleSubmit, errors} = useForm();
    const {user} = useContext(UserContext);
    const {enqueueSnackbar} = useSnackbar();
    const onSuccess = (message) => enqueueSnackbar(message, {variant: "success"});
    const onError = (message) => enqueueSnackbar(message, {variant: "error"});
    const [messageSent, setMessageSent] = useState(false);

    const onSubmit = async data => {
        setMessageSent(true);
        const {subject, message} = data;
        const companyEmail = props.notification.Job.Company.email;
        const applicationId = props.notification.id;
        const sendMailRes = await post("/student/sendMail", {
            subject,
            message,
            companyEmail
        }, user.jwt);
        if (sendMailRes.status === 200){
            onSuccess("Message sent!");
            const removeNotificationRes = await post("/student/jobs/markApplicationAsSeen/" + applicationId, {}, user.jwt);
            if (removeNotificationRes.status !== 201){
                onError(removeNotificationRes.data.message);
            }
            props.onMessageSent();
        }else{
            onError(sendMailRes.data.message);
            setMessageSent(false);
        }
  }

  return (
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <div className={classes.paper}>

        <form id={"register-company-form"} className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({required: true})}
            required
            fullWidth
            id="subject"
            label="Subject"
            name="subject"
            autoComplete="subject"
            autoFocus
          />

           <TextField
           inputRef={register({required: true})}
          label="Message"
          multiline
          rows={7}
          required
          fullWidth
          name="message"
          id="message"
          autoComplete="mesagge"
          variant="outlined"
          style={{marginBottom: 20}}
        />
          {(errors.subject && <Typography color="error">Subject is required.</Typography>) || (errors.message && <Typography color="error">Message is required.</Typography>)}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={messageSent}
          >
           Send Message
          </Button>
        </form>
      </div>
      </MuiThemeProvider>
    </Container>
  );
}