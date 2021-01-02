import React from "react";
import Carousel from 'react-elastic-carousel';
import Card from './components/Card';
import './job.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import utils from './utils';
import {UserContext} from './utils/user-context';
import ModalViewJob from './components/ModalViewJob';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import history from "./history";

const {get, post} = utils;


const useStyles = theme => ({
    root: {
        width: '90%',
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 20,
    },

    avatarStyle: {
        width: 70,
        height: 70,
    },

    topMargin:{
        marginTop: 20,
    },

    shadow:{
        boxShadow: '2px 3px 9px -8px #000000',
    },

    color: {
        background: '#03a9f4',
        '&:hover': {
            background: "#1076a3",
        },
    },

    tags: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },

    tag:{
        border: '1.5px solid #1076a3',
        color: '#1076a3',
    }

});


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
]

const placeHolderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris" +
    "sit amet semper metus. Ut placerat dictum ornare. Integer" +
    "suscipit ligula metus, sed consectetur elit lobortis eu. Fusce" +
    "nec metus eu lorem dignissim aliquet vitae id leo. Nam vitae" +
    "nisl hendrerit, elementum risus eget, elementum neque. Quisque" +
    "sed erat interdum, rutrum nisl a, semper eros. Cras auctor lorem" +
    "quis ultrices volutpat. Suspendisse potenti. Vestibulum ante" +
    "ipsum primis in faucibus orci luctus et ultrices posuere cubilia" +
    "curae; Duis pharetra, diam et placerat consequat, erat purus" +
    "maximus nunc, vitae vehicula lectus sapien vel velit. Praesent" +
    "ut cursus urna. Duis pretium mauris non condimentum semper." +
    "Mauris sed ante pharetra, tincidunt lacus id, posuere urna. Sed" +
    "lobortis velit neque, ac placerat sapien dapibus ac. Curabitur" +
    "posuere nisi malesuada mauris malesuada tempor. Praesent" +
    "ullamcorper condimentum venenatis. Suspendisse metus felis," +
    "laoreet hendrerit vehicula ac, lacinia a enim."

class CardCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            similarJobs: [],
            applied: false
        }
    }
    static contextType = UserContext;
    componentDidMount(){
        get('/jobs').then(({status, data}) => {
            if (status !== 200) return;
            this.setState({similarJobs: data});
        });
    }

    applyToJob(jobId){
        const { jwt } = this.context.user;
        post('/student/jobs/apply/' + jobId, {}, jwt).then(({status, message}) => {
            if (status === 201){
                this.setState({applied: true});
            }else{
                alert('Something went wrong :(');
                console.log(message);
            }
        });
    }

    render() {
        const { classes } = this.props;
        const {job, setJob} = this.props;
        if (!job)return (<p>Loading...</p>);
        const cityName = job.City ? job.City.name : "Los angeles"
        const countryName = (job.City && job.City.Country) ? job.City.Country.name : "USA"


        return (
            <div>
                <div className={`${classes.root} ${classes.shadow}`}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid
                            container
                            item
                            xs={3}
                            sm={2}
                            md={2}
                            lg={1}
                            justify="flex-start"
                        >
                            <Avatar className={classes.avatarStyle} />
                        </Grid>
                        <Grid item xs={7} sm={7} md={7} lg={8}>
                            <Typography variant="h5">{job.name}</Typography>
                            <Typography variant="h6">{job.Company.name}</Typography>
                        </Grid>
                        <Grid container xs={2} sm={3} md={3} lg={3} justify="flex-end">
                            <EditOutlinedIcon onClick={() => history.push('/editjob/'+job.id)}/>
                            <ModalViewJob job={job} setJob={setJob} />
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                className={classes.color}
                                onClick={() => this.applyToJob(job.id)}
                                disabled={this.state.applied}
                            >
                                {this.state.applied ? 'Applied!' : 'Apply now'}
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid container item xs={12} md={12} lg={12} justify="flex-start">
                            <Grid>
                                <Typography variant="subtitle1">{cityName} | {countryName} | {job.remote ? 'Remote' : 'In Place'} | {job.salary || 500}€</Typography>
                                <Grid container>
                                    <Typography variant="subtitle1">
                                        Category: IT
                                    </Typography>
                                </Grid>
                                <Typography variant="h6">Description</Typography>
                                <p>
                                    {job.description || placeHolderText}
                                </p>
                            </Grid>


                            <Grid xs={12} item>
                                <div className={classes.tags} style={{justifyContent: "left"}}>
                                    {job.requiredSkills.map(s =>
                                        <Chip key={'skill-required-' + s.id}
                                              className={classes.tag}
                                              variant="outlined"
                                              color="primary"
                                              label={s.name}
                                              href="#chip"
                                              style={{backgroundColor: '#1076a3', color: 'white'}}
                                        />
                                    )}
                                    {job.optionalSkills.map(s =>
                                        <Chip key={'skill-optional' + s.id}
                                              className={classes.tag}
                                              variant="outlined"
                                              color="secondary"
                                              label={s.name}
                                              href="#chip"
                                        />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Grid container justify="center" lg={12}>
                    <h2>Similar internships</h2>
                </Grid>
                <Carousel breakPoints={breakPoints} className={classes.topMargin}>
                    {this.state.similarJobs.map(j => <Card key={'similarJob-'+j.id} job={j} discardJob={() => {}} />)}
                </Carousel>
            </div>
        );
    }
}

export default withStyles(useStyles)(CardCarousel)