import React, {useContext, useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ModalMessage from "./components/ModalMessage";
import utils from "./utils";
import {UserContext} from "./utils/user-context";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const {get} = utils;

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const dataLoaded = useRef(false);
  const {user} = useContext(UserContext);

  const loadData = async () => {
      const res = await get("/student/jobs/getNotifications", null, user.jwt);
      if (res.status === 200){
          setNotifications(res.data);
      }
  }

  useEffect(() => {
      if (dataLoaded.current === false){
          dataLoaded.current = true;
          loadData().then(() => {});
      }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Badge aria-describedby={id} onClick={handleClick} badgeContent={notifications.length} color="primary">
        <MailOutlineIcon fontSize="large" />
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.paper}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          {
              notifications.map((n, i) =>
                  <div><p className={classes.typography}>{n.Job.Company.name} {n.declined === false ? "accepted" : "refused"} you for an internship as {n.Job.name}
                      {n.declined === false && <ModalMessage/>}
                      {n.declined === true &&  <IconButton aria-label="clear">
            <ClearIcon style={{color: "red"}} />
          </IconButton>}
                  </p>
                      {i < notifications.length-1 && <hr></hr>}</div>)
          }
      </Popover>
    </div>
  );
}