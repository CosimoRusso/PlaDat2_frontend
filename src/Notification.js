import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      <Badge aria-describedby={id} onClick={handleClick} badgeContent={2} color="primary">
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
        <p className={classes.typography}>Apple accepted you for an internship as Database Developer <Button href={"mailto:companyemailfromdatabase"}  variant="contained" size="small"
            style={{backgroundColor: "#03a9f4", color: "white"}}>Contact</Button></p>
        <hr></hr>
        <p className={classes.typography}>Microsoft denied you for an internship as Web Developer</p>

      </Popover>
    </div>
  );
}