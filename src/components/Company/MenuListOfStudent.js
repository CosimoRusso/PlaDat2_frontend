import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import history from './../../history';
import Typography from '@material-ui/core/Typography';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     <MoreVertRoundedIcon color="action" onClick={handleClick}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Typography onClick={() => history.push("/student/profile")}>View Profile</Typography></MenuItem>
        <MenuItem onClick={handleClose}><CheckIcon style={{color: "green"}}/>Accept</MenuItem>
        <MenuItem onClick={handleClose}><ClearIcon color="secondary"/>Decline</MenuItem>
      </Menu>
    </div>
  );
}