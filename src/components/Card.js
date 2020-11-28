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

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  let { job, discardJob } = props;
  if (!job) job = { name: 'React Developer', companyId: 1, id: 1, salary: 200, remote: true, company: {name: 'Netflix'} }
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
            <ClearIcon onClick={discardJob.bind(null, job.id)} />
          </IconButton>
        }
        title={job.name || 'React Developer'}
        // eslint-disable-next-line
        subheader={job.company && job.company.name || 'Netflix'}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {job.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas id arcu sit amet placerat. Aliquam erat volutpat. Praesent auctor mattis tortor ac laoreet.'}
        </Typography>
      </CardContent>

      <CardActions className={classes.left}>
      <Grid
       container
       direction="row"
       justify="flex-start"
        >
      <Typography variant="body2" color="textSecondary" component="p">
          {job.salary || '3000'}EUR | {job.remote ? 'Remote' : 'In Place'}
        </Typography>
        </Grid>
        <Grid
       container
       direction="row"
       justify="flex-end"
        >
        <Button size="small" variant="contained" color="primary" onClick={() => history.push("/viewjob/"+job.id)} className={classes.color}>
  Read more
</Button>
</Grid>
      </CardActions>
      </Grid>
    </Card>
  );
}