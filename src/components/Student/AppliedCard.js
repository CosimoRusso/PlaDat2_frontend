import React from 'react';
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
import ScheduleIcon from '@material-ui/icons/Schedule';



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
//   const itemsList = [
//     {
//         text: "Wating",
//         icon: <ScheduleIcon />,
//         color: '#03a9f4'
//     },
//     {
//         text: "Accepted",
//         icon: <CheckIcon />,
//         color: '#00FF00'
//     },
//     {
//         text: "Declined",
//         icon: <ClearIcon />,
//         color: '#FF0000'
//     },
// ];

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
        action={
          <IconButton aria-label="clear">
            <ClearIcon />
          </IconButton>
        }
        title={'React Developer'}
        // eslint-disable-next-line
        subheader={'Netflix'}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas id arcu sit amet placerat. Aliquam erat volutpat. Praesent auctor mattis tortor ac laoreet.'}
        </Typography>
      </CardContent>

      <CardActions className={classes.left}>
      <Grid
       container
       direction="row"
       justify="flex-start"
        >
            {/* {itemsList.map((item, index) => {
            const { text, icon, color } = item; */}
            {/* return ( */}
                <div style={{display: "flex"}}>
                <ScheduleIcon />
                  <Typography variant="subtitle2" style={{marginLeft: 5}}>
                  Waiting
                 </Typography>
                 </div>
              {/* ); */}
            {/* })} */}

        </Grid>
        <Grid
       container
       direction="row"
       justify="flex-end"
        >
        <Button size="small" variant="contained" color="primary" className={classes.color}>
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