import React from 'react';
import history from './../history';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
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
import axios from 'axios';

const useStyles = theme => ({
  root: {
    maxWidth: 305,
    flexGrow: 1,
    marginBottom: '20px',
    marginLeft: '12px',
    display: 'inline-block',
    justify: 'center',
    alignItems: 'center',
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
});

class JobsList extends React.Component {
  state = {
    jobs: []
  }

  componentDidMount() {
    axios.get(`https://pladat2.herokuapp.com/api/v1/jobs/`)
      .then(res => {
        const jobs = res.data;
        this.setState({ jobs });
      })
  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.jobs.map((job) => (
          <Card className={classes.root}>
            <Grid item xs>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="clear">
                    <ClearIcon />
                  </IconButton>
                }
                title={job.name}
                subheader={"Netflix"}
              />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas id arcu sit amet placerat. Aliquam erat volutpat. Praesent auctor mattis tortor ac laoreet.' || job.description}
                </Typography>
              </CardContent>

              <CardActions className={classes.left}>
                <Grid container direction="row" justify="flex-start">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {job.salary}
                  </Typography>
                </Grid>
                <Grid container direction="row" justify="flex-end">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/job/" + job.id)}
                    className={classes.color}
                  >
                    Read more
                  </Button>
                </Grid>
              </CardActions>
            </Grid>
          </Card>
        ))}
      </div>
    );}
}

export default withStyles(useStyles)(JobsList)