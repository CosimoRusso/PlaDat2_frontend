import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from "@material-ui/core/Typography";
import Registration from "./Registration";
import {UserContext} from '../utils/user-context';
import history from './../history';
import utils from '../utils';

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

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleOpen = () => {
      if(!user){
        setOpen(true);
      }else{
        setUser(null);
        utils.setSessionCookies(null, null, null);
        history.push('/');
      }

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className={classes.divline}>
   <Typography

               variant= "subtitle1"
               color="inherit"
               onClick={handleOpen}>
       Don't have an account? Register
      </Typography>
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
            <Registration/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}