import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 305,
    flexGrow: 1,
    marginBottom: '20px',
    marginLeft: '15px',
  },
  color: {
    color: '#03a9f4',

  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
              <Grid container direction="row" justify="center" alignItems="center">
      <CardContent>
<Typography variant="h6"  color="textSecondary">Add New Internship</Typography>
<Grid container justify="center" >
<AddCircleOutlineIcon className={classes.color} style={{fontSize: 50}}/>
        </Grid>
      </CardContent>
</Grid>
    </Card>
  );
}