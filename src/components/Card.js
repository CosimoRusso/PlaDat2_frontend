import React from 'react';
import history from './../history';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 305,
    flexGrow: 1,
    marginBottom: '20px',
    marginLeft: '15px',
  },

  color: {
    background: '#03a9f4',
    '&:hover': {
      background: "#1076a3",
   },
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <Grid item xs>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="clear">
            <ClearIcon />
          </IconButton>
        }
        title="React Developer"
        subheader="Netflix"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas id arcu sit amet placerat. Aliquam erat volutpat. Praesent auctor mattis tortor ac laoreet.
        </Typography>
      </CardContent>

      <CardActions className={classes.left}>
      <Grid
       container
       direction="row"
       justify="flex-start"
        >
      <Typography variant="body2" color="textSecondary" component="p">
        3000EUR | Remote
        </Typography>
        </Grid>
        <Grid
       container
       direction="row"
       justify="flex-end"
        >
        <Button size="small" variant="contained" color="primary" onClick={() => history.push("/job")} className={classes.color}>
  Read more
</Button>
</Grid>
      </CardActions>
      </Grid>
    </Card>
  );
}