import React, {useContext, useEffect, useState} from 'react';
import history from './../history';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Search from "./Search";
import Filters, {RangeSlider} from "./Filters";
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import {UserContext} from "../utils/user-context";
import utils from '../utils';

const {get} = utils;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '20px',
  },

  drawerPaper: {
    width: drawerWidth,

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
  align: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    paddingTop: 11,
    marginBottom: 10,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const {searchText, setSearchText} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({firstName: 'Pippo', lastName: ''});

  useEffect(() => {
      const fetchData = async () => {
          if(!(user && user.userId)) return;
          const {data, status, message} = await get('/student/findOne/' + user.userId);

          if (status === 200){
              setUserData({
                  firstName: data.firstName,
                  lastName: data.lastName
              })
          }else{
              console.log("ERROR " + message + " STATUS " + status);
          }
      }
      return fetchData();
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (

    <div>
      <div className={classes.align}>
    <Avatar>M</Avatar>
   <Typography variant="subtitle2" style={{marginLeft: "10px"}}>
       {userData.firstName + ' ' + userData.lastName}
  <Typography variant="subtitle2" onClick={() => history.push("/profile")} color="primary">
  Profile details
   </Typography>
   </Typography>
   </div>
   <Divider/>
      <div  className={classes.root}>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Filters/>
      <RangeSlider/>
    </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      </div>
      );
}

export default ResponsiveDrawer;