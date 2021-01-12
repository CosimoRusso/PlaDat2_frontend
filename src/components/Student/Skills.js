import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme, {MuiThemeProvider} from '../../Theme';
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import utils from '../../utils';

const {get} = utils;

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
    const [levels, setLevels] = useState([]);
    const [level, setLevel] = useState(3);
    const {enqueueSnackbar} = useSnackbar();
    const setError = message => enqueueSnackbar(message, {variant: 'error'});
    const {register, handleSubmit, errors} = useForm({
        categoryname: skill.SkillCategory.name,
        skillname: skill.name
    });
    const dataLoaded = useRef(false);
    const onSubmit = async data => {
        await onUpdate(skill.id, level)
    }

    const onLevelChange = (newLevel) => {
        const newLevelInt = parseInt(newLevel)
        const levelsInt = levels.map(l => parseInt(l.level));
        const max = Math.max.apply(Math, levelsInt);
        const min = Math.min.apply(Math, levelsInt);
        if (newLevelInt > max || newLevelInt < min) return false;
        setLevel(newLevelInt);
    }

    const loadData = async () => {
        const res = await get('/skills/getOne/' + skill.id);
        if (res.status === 200){
            setLevels(res.data.SkillCategory.LevelDescriptions)
            setLevel(skill.StudentSkill.rating);
        } else{
            setError("Cannot fetch level descriptions: " + res.data.message);
        }
    }

    useEffect(() => {
        if (!dataLoaded.current){
            dataLoaded.current = true;
            loadData().then(() => {});
        }
    })

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
                            fullWidth
                            id="skilllevel"
                            label="Level"
                            name="skilllevel"
                            type="number"
                            autoComplete="skilllevel"
                            placeholder="How good are you?"
                            value={level}
                            onChange={e => onLevelChange(e.target.value)}
                        />
                        <p style={{background: "#2196f3", color: "white", padding: "5px"}}>
                            {levels.find(l => l.level === level) ? levels.find(l => l.level === level).description : "Hello"}
                        </p>


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