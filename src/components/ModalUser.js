import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from 'react-reveal/Slide';
import Typography from "@material-ui/core/Typography";
import UserType from './UserType'

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

  line: {
    margin: theme.spacing(3),
    '&:hover': {
     color: 'black',

  }
   },

}));

export default function TransitionsModal(props) {
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
   <div
               onClick={handleOpen}>
      {props.content}
      </div>
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
        <Slide in={open}>
          <div className={classes.paper}>
            <UserType/>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}