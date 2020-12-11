import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import JobExperience from './JobExperience';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px groove grey',
    boxShadow: theme.shadows[8],
    padding: theme.spacing(1, 3, 5),
    outline: 0,
  },

  divline: {
      display: 'inline-block',

  },
  color: {
    background: '#03a9f4',
  },

  line: {
    margin: theme.spacing(3),
    '&:hover': {
     color: 'black',

  }
   },

}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
        setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className={classes.divline}>
  <Grid item  onClick={handleOpen}>
<EditOutlinedIcon />
</Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <JobExperience/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}