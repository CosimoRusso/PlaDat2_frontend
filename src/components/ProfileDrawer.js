import React from 'react';
import history from './../history';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer as MUIDrawer}from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "./Modal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
},
  title: {
    flexGrow: 1,
  },
  color: {
    background: '#03a9f4',
  },
  line: {
    margin: theme.spacing(1),
    '@media (min-width:600px)': {
      margin: theme.spacing(3),
    },
    '&:hover': {
     color: 'black',
  }
   },
   active: {
    '&:active': {
      color: '#03a9f4 !important',

   }
   },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

}));

const Drawer = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const itemsList = [
    {
        text: "General Info",
        icon: <InfoOutlinedIcon/>,
        onClick: () => history.push('/student/profile')
    },

    {
        text: "Skills",
        icon: <EditOutlinedIcon />,
        onClick: () => history.push('/student/skills')
    },
    {
        text: "Saved interenships",
        icon: <BookmarkBorderOutlinedIcon />,
        onClick: () => history.push('/student/appliedinternships')
    },
];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.color, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>

        {!isMobile ? (
           <>

          <IconButton
                      edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />

          </IconButton>

          <Typography variant="h5" className={classes.title}>
            PlaDat
            </Typography>

          <Typography m={10}
               display= 'inline'
               className={classes.line}
               variant= "subtitle1"
               onClick={() => history.push('/')}
              >
                Home
              </Typography>
              <Typography r={10}
                display = 'inline'
                className={classes.line}
                variant= "subtitle1"
                onClick={() => history.push('/browsejobs')}
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

              </>

     ) : (
      <>
  <Typography variant="h5" className={classes.title}>
            PlaDat
            </Typography>
          <Typography m={10}
               className={classes.line}
               variant= "subtitle1"
               onClick={() => history.push('/')}
              >
                Home
              </Typography>
              <Typography r={10}
                display = 'inline'
                className={classes.line}
                variant= "subtitle1"
                onClick={() => history.push('/browsejobs')}
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
              </>
                      )}
        </Toolbar>
      </AppBar>
      <MUIDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}

      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (

              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText  primary={text} />
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>

    </div>
  );
}
export default Drawer;