import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from './microsoft.png';
import Card from './components/Company/Card';
import ModalAboutUs from './components/Company/ModalAboutUs';
import ModalCompanyInfo from './components/Company/ModalCompanyInfo';
import { UserContext } from "./utils/user-context";
import utils from './utils';
import { useSnackbar } from "notistack";

const { get } = utils;


const theme = createMuiTheme();

theme.typography.h2 = {
  fontSize: '1.5rem',
  fontWeight: 500,
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
    fontWeight: 500,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
    fontWeight: 500,
  },
};


theme.typography.h3 = {
  fontSize: '1.3rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },

};

theme.typography.h4 = {
  fontSize: '0.8rem',
  fontWeight: 200,
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
    fontWeight: 200,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
    fontWeight: 400,
  },
};




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    divTop: {
      marginTop: 40,
    },

    large: {
      width: 50,
      height: 50,
      '@media (min-width:600px)': {
        width: 70,
        height: 70,
      },
      '@media (min-width:1000px)': {
        width: 100,
        height: 100,
      },
    },
    paper: {
        padding: theme.spacing(1),
        '@media (min-width:600px)': {
          padding: theme.spacing(4),
        },
      },
      paper2: {
        padding: theme.spacing(2),
      },


}));


export default function GeneralInfo() {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const companyId = user.userId;
    const dataLoaded = useRef(false);
    const {enqueueSnackbar} = useSnackbar();
    const [company, setCompany] = useState(null);

    const loadData = async () => {
        const companyRes = await get(`/company/findOne/${companyId}`);
        if (companyRes.status !== 200){
            enqueueSnackbar(companyRes.data.message, {variant: 'error'});
            return;
        }
        setCompany(companyRes.data);
    }

    useEffect(() => {
        if (!dataLoaded.current){
            dataLoaded.current = true;
            loadData().then(() => {});
        }
    })
    if (!company) return <p>Loading...</p>;
    return (
        <div className={classes.root}>
          <div>
           <Navbar/>
           </div>
           <div className={classes.divTop}/>
           <ThemeProvider theme={theme}>
           <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
<Grid item xl={10} lg={10} md={10} sm={11} xs={10}>
          <Paper className={classes.paper} style={{paddingBottom: 50}}>
          <Grid container xl={12} lg={12} md={12} sm={12} xs={12} direction="row" justify="flex-end" alignItems="flex-end"><ModalCompanyInfo company={company} setCompany={setCompany} /></Grid>
          <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
          <Grid xl={2} lg={2} md={2} sm={2} xs={3} item>
   <Avatar style={{border: "2px solid lightGrey"}} src={logo} className={classes.large}></Avatar>
   </Grid>
<Grid xl={2} lg={2} md={2} sm={2} xs={3} item>
    <Typography style={{fontSize: 20, fontWeight: 500, color: '#03a9f4', marginBottom: 10}}>{company.name}</Typography>
    <Typography color="textSecondary">Country</Typography>
    <Typography color="textSecondary">City</Typography>
    <Typography color="textSecondary">Email</Typography>
</Grid>
<Grid style={{marginTop: 45}} xl={3} lg={3} md={3} sm={3} xs={5} item>
    <Typography variant="subtitle2">{company.City && company.City.Country.name}</Typography>
    <Typography variant="subtitle2">{company.City && company.City.name}</Typography>
    <Typography variant="subtitle2">{company.email}</Typography>
</Grid>
<Grid style={{marginTop: 40}} xl={2} lg={2} md={2} sm={2} xs={6} item>
<Typography color="textSecondary">Founded</Typography>
    <Typography color="textSecondary">Company Size</Typography>
    <Typography color="textSecondary">Website</Typography>
</Grid>
<Grid style={{marginTop: 45}} xl={3} lg={3} md={3} sm={2} xs={6} item>
<Typography variant="subtitle2">1975</Typography>
    <Typography variant="subtitle2">156 000</Typography>
    <Typography variant="subtitle2">www.{company.name && company.name.toLowerCase()}.com</Typography>
</Grid>


</Grid>
</Paper>
    </Grid>

<Grid container xl={10} lg={10} md={10} sm={11} xs={10} justify="space-between">
    <Grid style={{marginTop: 35}} item xl={7} lg={7} md={6} sm={6}>
          <Paper className={classes.paper}>
          <Grid xl={12} lg={12} md={12} sm={12} xs={12} container>
          <Grid item xl={8} lg={6} md={7} sm={7} xs={9}>
                      <Typography variant="subtitle2" style={{fontSize: 16}}>About Us</Typography>
                      </Grid>
                      <Grid container xl={4} lg={6} md={5} sm={5} xs={3} direction="row" justify="flex-end" alignItems="flex-end"><ModalAboutUs company={company} setCompany={setCompany}/></Grid>
</Grid>
<Grid item>
    <br></br>
<Typography style={{fontSize: 12, textAlign: "justify"}} color="textSecondary">{company.description}
</Typography>
</Grid>
</Paper>
    </Grid>

    <Grid style={{marginTop: 35}} item xl={3} lg={4} md={5} sm={5}>
          <Paper className={classes.paper2}>
          <Grid lg={12} md={12} sm={12} xs={12} container>
     <Typography variant="subtitle2" style={{fontSize: 16}}>Jobs</Typography>
</Grid>
<br></br>
              {company.Jobs.map(job =>
                  <Grid key={job.id} lg={12} md={12} sm={12} xs={12} container spacing={2}>
                      <Card job={job} />
                  </Grid>
              )}

</Paper>
    </Grid>

    </Grid>
    </Grid>


    </ThemeProvider>
           </div>
    );
}