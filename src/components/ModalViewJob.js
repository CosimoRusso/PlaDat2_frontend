import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditViewJob from './EditViewJob';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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


}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
        setOpen(true);
  };

  const handleClose = (props) => {
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
            <EditViewJob job={props.job} setJob={props.setJob}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}