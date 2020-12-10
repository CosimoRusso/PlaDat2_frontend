import React from "react";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { makeStyles } from '@material-ui/core/styles';

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";


const useStyles = makeStyles({
    size: {
        width: 50,
        height: 50,
        margin: "0 auto !important",
    }

  });

// const percentage = 44;

export default function Circle() {
    const classes = useStyles();

    return (
        <div className={classes.size}>

                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={44}
                    duration={1.4}
                    easingFunction={easeQuadInOut}

                >
                    {value => {
                        const roundedValue = Math.round(value);
                        return (
                            <CircularProgressbar
                                value={value}
                                text={`${roundedValue}%`}
                                styles={buildStyles({ pathTransition: "none" })}
                            />
                        );
                    }}
                </AnimatedProgressProvider>

        </div>
    );
}


