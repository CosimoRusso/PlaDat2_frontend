import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Theme, {MuiThemeProvider} from '../../Theme';
import utils from '../../utils';
import {UserContext} from '../../utils/user-context'
import CustomizedSnackbars from "../CustomSnackbar";

const {post} = utils;


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

    margin: {
        margin: theme.spacing(1),
      },

}));

export default function ChangePassword() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState([]);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);

    const [showAlert, setShowAlert] = useState({type: 'error', message: ''});
    const setError = (message) => setShowAlert({type: 'error', message});
    const setSuccess = (message) => setShowAlert({type: 'success', message});

    const {user} = useContext(UserContext);

    const onSubmit = async data => {
        const e = [];
        const {currentPass, newPass, retypeNew} = data;
        if (newPass !== retypeNew) e.push("The new passwords do not match");
        if (newPass.length < 8) e.push("The new password must be at least 8 characters");
        if (!currentPass) e.push("Invalid current password");
        setErrors(e);
        if (e.length) return false;
        const res = await post('/student/profile', {
            password: newPassword
        }, user.jwt );
        if (res.status === 200){
            setSuccess('Password updated!')
        }else{
            setError('Error: ' + res.data.message)
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
                  <MuiThemeProvider theme={Theme}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Change password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Current password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-old-password"
                            inputRef={register({required: true})}
                            name="currentPass"
                            margin="normal"
                            value={currentPassword}
                            type={showCurrentPassword ? 'text' : 'password'}
                            onChange={e => setCurrentPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-new-password"
                            inputRef={register({required: true})}
                            name="newPass"
                            margin="normal"
                            value={newPassword}
                            type={showNewPassword ? 'text' : 'password'}
                            onChange={e => setNewPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-new-password">Re-type password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            inputRef={register({required: true})}
                            name="retypeNew"
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    {errors.map(e => <Typography color="error">{e}</Typography>)}

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
            <CustomizedSnackbars type={showAlert.type} message={showAlert.message} setMessage={m => setShowAlert({type: showAlert.type, message: m})} />
        </Container>
    );
}