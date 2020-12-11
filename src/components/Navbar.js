import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "./Modal";
// import logo from "../Logo.png"
// import Search from "./Search";
// import Filters, {RangeSlider} from "./Filters";

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
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

  login: {
    margin: theme.spacing(3),
    '&:hover': {
      color: 'black',

   }
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);

  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "Jobs",
      pageURL: "/browsejobs"
    },
    {
      menuTitle: <Modal/>,
    },
    {
      menuTitle: "Profile",
      pageURL: "/profile"
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" className={`${classes.color} ${classes.appBar}`}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            PlaDat
          {/* <img
            className={classes.logo}
            width="100"
            height="50"
            src={logo}
            alt="Bosch Logo"/> */}
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <div>
              <Typography m={10}
               className={classes.line}
               display= 'inline'
               variant= "subtitle1"
               onClick={() => handleButtonClick("/")}
              >
                Home
              </Typography>
              <Typography r={10}
                className={classes.line}
                display = 'inline'
                variant= "subtitle1"
                onClick={() => handleButtonClick("/browsejobs")}
              >
               Browse Jobs
              </Typography>
              <Typography r={10}
                className={classes.line}
                display = 'inline'
                variant= "subtitle1"
              >
                <Modal/>
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);