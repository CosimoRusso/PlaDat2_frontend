import React, {useContext, useEffect, useRef, useState} from 'react';
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
  const {allJobs, jobs, setJobs} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({name: ''});
  const dataFetched = useRef(false);

  //filters
    const [searchText, setSearchText] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [partTime, setPartTime] = React.useState(false);
    const [fullTime, setFullTime] = React.useState(false);
    const [remote, setRemote] = React.useState(false);
    const [office, setOffice] = React.useState(false);
    const [salary, setSalary] = React.useState([0, 3000]);

    const applyFilters = () => {
        if (!allJobs || !allJobs.length) return;
        let out = JSON.parse(JSON.stringify(allJobs));
        // search text
        let regex;
        if (searchText){
            regex = new RegExp(searchText, 'i');
            out = out.filter(j => regex.test(j.name) || regex.test(j.description));
        }
        // location
        if (searchLocation){
            regex = new RegExp(searchLocation, 'i');
            out = out.filter(j => j.City && j.City.id && regex.test(j.City.name))
        }
        // part time / full time
        if (partTime && !fullTime){
            out = out.filter(j => j.partTime === true)
        } else if (fullTime && ! partTime){
            out = out.filter(j => j.partTime === false)
        }
        // remote / office
        if (remote && !office){
            out = out.filter(j => j.remote === true)
        } else if (office && !remote){
            out = out.filter(j => j.remote === false)
        }
        // salary
        out = out.filter(j => j.salary > salary[0] && j.salary < salary[1]);
        setJobs(out);
    }

  useEffect(() => {
      const fetchData = async () => {
          if(!(user && user.userId)) return;
          const {data, status, message} = await get(`/${user.userType}/findOne/${user.userId}`);

          if (status === 200){
              const obj = {
                  name: user.userType === "student" ? data.firstName + ' ' + data.lastName : data.name
              }
              setUserData(obj);
          }else{
              console.log("ERROR " + message + " STATUS " + status);
          }
      }
      if (!dataFetched.current){
          dataFetched.current = true;
          return fetchData();
      }else{
          applyFilters()
      }

  }, [searchText, searchLocation, partTime, fullTime, remote, office, salary])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (

    <div>
      <div className={classes.align}>
    <Avatar>{userData && userData.name && userData.name.substr(0,1)}</Avatar>
   <Typography variant="subtitle2" style={{marginLeft: "10px"}}>
       {userData.name}
  <Typography variant="subtitle2" onClick={() => history.push(`/${user.userType}/profile`)} color="primary">
  Profile details
   </Typography>
   </Typography>
   </div>
   <Divider/>
      <div  className={classes.root}>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Filters
          location={searchLocation} setLocation={setSearchLocation}
          partTime={partTime} setPartTime={setPartTime}
          fullTime={fullTime} setFullTime={setFullTime}
          remote={remote} setRemote={setRemote}
          office={office} setOffice={setOffice}
      />
      <RangeSlider salary={salary} setSalary={setSalary}/>
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