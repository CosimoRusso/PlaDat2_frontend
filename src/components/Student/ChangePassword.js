import React from 'react';
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
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

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
                            id="outlined-adornment-password"
                            inputRef={register({required: true})}
                            name="currentPass"
                            margin="normal"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            inputRef={register({required: true})}
                            name="newPass"
                            margin="normal"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Re-type password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            inputRef={register({required: true})}
                            name="retypeNew"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>


                    {(errors.currentPass && <Typography color="error">Wrong current password</Typography>)
                        || (errors.newPass && <Typography color="error">New password is required</Typography>)
                        || (errors.retypeNew && <Typography color="error">Doesn't match with new pasword</Typography>)}

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