import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({

    root: {
        width: 200,
    },
    slider: {
        height: 8
    },
});

const PrettoSlider = withStyles({
    root: {
      color: '#03a9f4',
      height: 6,
    },
    thumb: {
      height: 18,
      width: 18,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -5,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50%)',
    },
    track: {
      height: 6,
      borderRadius: 4,
    },
    rail: {
      height: 6,
      borderRadius: 4,
    },
  })(Slider);


const BlueCheckbox = withStyles({
    root: {
        color: grey[400],
        display: 'block',
        '&$checked': {
            color: blue[600],
        },
    },
    checked: {},

})((props) => <Checkbox color="default" {...props} />);

function CheckboxLabels(props) {
    const {location, setLocation, partTime, setPartTime, fullTime, setFullTime, remote, setRemote, office, setOffice} = props;


    return (
        <div>
          <TextField id="outlined-search" label="Location" size="small" type="string" variant="outlined" style={{paddingRight: 20, marginTop: 15}}
             value={location}
             onChange={e => setLocation(e.target.value)}
             InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton style={{padding: "0"}}>
                      <LocationIcon/>
                    </IconButton>
                  </InputAdornment>
                )
              }}/>
            <p>Pick the best option for you</p>
            <FormGroup>
                <FormControlLabel
                    control={
                        <BlueCheckbox
                            checked={partTime}
                            onChange={e => setPartTime(e.target.checked)}
                            name="checkedA"
                            color="primary"
                        />
                    }
                    label="Part-time"
                />
                <FormControlLabel
                    control={
                        <BlueCheckbox
                            checked={fullTime}
                            onChange={e => setFullTime(e.target.checked)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Full-time"
                />
                <p>Way of working</p>
                <FormControlLabel
                    control={
                        <BlueCheckbox
                            checked={remote}
                            onChange={e => setRemote(e.target.checked)}
                            name="checkedC"
                            color="primary"
                        />
                    }
                    label="Remote"
                />
                <FormControlLabel
                    control={
                        <BlueCheckbox
                            checked={office}
                            onChange={e => setOffice(e.target.checked)}
                            name="checkedD"
                            color="primary"
                        />
                    }
                    label="Office"
                />
            </FormGroup>
        </div>
    );
}


function valuetext(value) {
    return `${value}$`;
}

function RangeSlider(props) {
    const classes = useStyles();
    const {salary, setSalary} = props;

    const handleChange = (event, newValue) => {
        setSalary(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Salary
            </Typography>
            <PrettoSlider className={classes.slider}
                value={salary}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                step={50}
                min={0}
                max={3000}
            />
        </div>
    );
}

export default CheckboxLabels;
export { CheckboxLabels, RangeSlider };