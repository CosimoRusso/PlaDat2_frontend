import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckIcon from "@material-ui/icons/Check";
import history from '../../history';
import ModalMessage from "../ModalMessage";


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

  email: {
    color: 'black',
    '&:hover': {
     color: "#1076a3 !important",
   },
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const {job} = props;
  const [showContactBtn, setShowContactBtn] = useState(job.alreadyNotified === false);

  return (
    <div>
    <Grid
    container
    direction="row"
    justify= "center"
  >
    <Card className={classes.root}>
        <Grid item xs>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        title={job.Job.name}
        // eslint-disable-next-line
        subheader={job.Job.Company.name}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {job.Job.description}
        </Typography>
      </CardContent>

      <CardActions className={classes.left}>
      <Grid
       container
       direction="row"
       justify="flex-start"
        >
          {job.declined === null &&
                <div style={{display: "flex"}}>
                <ScheduleIcon />
                  <Typography variant="subtitle2" style={{marginLeft: 5}}>
                  Waiting
                 </Typography>
                 </div>
          }
          {job.declined === true &&
          <div style={{display: "flex"}}>
              <ClearIcon />
              <Typography variant="subtitle2" style={{marginLeft: 5}}>
                  Declined
              </Typography>
          </div>
          }
          {job.declined === false &&
          <div style={{display: "flex"}}>
              <CheckIcon />
              <Typography variant="subtitle2" style={{marginLeft: 5}}>
                  Accepted
              </Typography>
              { showContactBtn && <ModalMessage notification={job} onMessageSent={() => {setShowContactBtn(false)}} />}
          </div>
          }

        </Grid>
        <Grid
       container
       direction="row"
       justify="flex-end"
        >
        <Button onClick={() => history.push(`/viewjob/${job.JobId}`)} size="small" variant="contained" color="primary" className={classes.color}>
            Read more
        </Button>
</Grid>
      </CardActions>
      </Grid>
    </Card>
    </Grid>
    </div>
  );
}