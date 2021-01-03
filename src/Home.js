import React, {useContext} from "react";
import './font.css';
import './wave.css';
import Navbar from "./components/Navbar";
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { Player } from '@lottiefiles/react-lottie-player';
import Button from '@material-ui/core/Button';
import makeCarousel from 'react-reveal/makeCarousel';
import styled from 'styled-components';
import ModalUser from './components/ModalUser';
import One from './1.png'
import Two from './2.png'
import Three from './3.png'
import Four from './4.png'

const {UserContext} = require('./utils/user-context');

const Home = () => {
  const { user } = useContext(UserContext);

  if(user) {
    if (user.userType === 'student')
      return <Redirect to={'/dashboard'} />
    else
      return <Redirect to={'company/dashboard'} />
  }

  const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;
const CarouselUI = ({ children }) => <Container>{children}</Container>;
const Carousel = makeCarousel(CarouselUI);
const button = <Button variant="contained" size='large' style={{backgroundColor: '#FFD774',  color: '#4b4c4c', fontWeight: 500, marginTop: 40,  boxShadow: '20'}}>Join Now</Button>;
const button2 =  <Button variant="contained" size="large" style={{backgroundColor: 'grey',  color: 'white', fontWeight: 500, marginTop: 40,  boxShadow: '20'}}>Join Now</Button>
  return <div>
    <Carousel defaultWait={7000}>
    <Slide right duration={1000}>
      <div>
    <Navbar color="#29B3FF"/>
    <div style={{height: '90vh'}}>
    <div style={{position: 'relative', backgroundColor: '#29B3FF', minHeight: '300px'}}>
    <div class="custom-shape-divider-bottom-1609097516">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
    <Grid container  direction="row" justify="center">
        <Grid container direction="row"  lg={7} xs={11} justify="center" alignItems="center">
<Zoom left cascade>
        <div>
          <Zoom left cascade>
  <h1 id="herotitle">Create Your Future</h1>
  <h3 id="herosubtitle">Find the right internship for you</h3>
  <ModalUser content={button}/>
  </Zoom>
  </div>
  </Zoom>

        </Grid>
        <Grid container direction="row" lg={5} xs={12} justify="flex-end">
        <Slide right>
        <Player
  autoplay
  loop
  src="https://assets1.lottiefiles.com/private_files/lf30_OrNVxx.json"
  style={{ height: '510px', width: '510px'}}
>
</Player>
</Slide>
        </Grid>
</Grid>
</div>
</div>
</div>
</Slide>

<Slide right duration={1000}>
<div>
<Navbar color="#FFD774"/>
    <div style={{height: '90vh'}}>
    <div style={{position: 'relative', backgroundColor: '#FFD774', minHeight: '300px'}}>
    <div class="custom-shape-divider-bottom-1609097516">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
    <Grid container  direction="row" justify="center">
        <Grid container direction="row"  lg={7} xs={11} justify="center" alignItems="center">
<Zoom left cascade>
        <div>
          <Zoom left cascade>
  <h1 id="herotitle">Find Your Employee</h1>
  <h3 id="herosubtitle" >Find the best student for your job</h3>
  <ModalUser content={button2}/>
  </Zoom>
  </div>
  </Zoom>

        </Grid>
        <Grid container direction="row" lg={5} xs={12} justify="flex-end">
        <Slide right duration={1500}>
        <Player
  autoplay
  loop
  src="https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json"
  style={{ height: '510px', width: '510px'}}
>
</Player>
</Slide>
        </Grid>
</Grid>
</div>
</div>
</div>
</Slide>
  </Carousel>


<div style={{height: '90vh'}}>
        <Grid container  direction="row" justify="center" alignItems="center" lg={12}>
        <Grid container justify="center"  lg={5} xs={12}>
        <Zoom left delay={500} duration={1500}>
        <Player
  autoplay
  loop
  src="https://assets2.lottiefiles.com/packages/lf20_VuL7dB.json"
  style={{ height: '410px', width: '410px'}}
>
</Player>
</Zoom>
        </Grid>

        <Grid justify="center" lg={5} xs={11}>
        <Zoom right cascade delay={500} duration={1500}>
<h1 id="ourmission">Our Mission</h1>
<p id="missionsubtitle">Our mission is to provide for both students and companies the easiest and most practical way of finding their desirable job or employee. With a matching algorithm implemented students will be offered internships that suit their knowledge and companies will get the best students for their job.</p>
  </Zoom>
       </Grid>
</Grid>
</div>


<div style={{height: '100vh'}}>
<Grid container direction="row" justify="center" alignContent="space-between">
<Grid container justify="center" xs={12} sm={12} md={12} lg={12}>
  <Zoom delay={500}>
<h1 id="ourmission">How to start?</h1>
</Zoom>
</Grid>

<Grid  xs={12} sm={5} md={5} lg={5}>
  <div style={{textAlign: "center"}}>
  <Zoom delay={800}>
    <img src={One} alt="one"/>
  <h3 id="missionsubtitle">Sign up and fill your skills using a simple form</h3>
  </Zoom>
  </div>
  </Grid>
  <Grid  xs={12} sm={5} md={5} lg={5}>
  <div style={{textAlign: "center"}}>
  <Zoom delay={1100}>
    <img src={Two} alt="two"/>
  <h3 id="missionsubtitle">Our algorithm will find for your skills matching internships</h3>
  </Zoom>
  </div>
  </Grid>
  <Grid item xs={12} sm={5} md={5} lg={5}>
  <div style={{textAlign: "center"}}>
  <Zoom delay={1400}>
    <img src={Three} alt="three"/>
  <h3 id="missionsubtitle">Apply for internship you are interested in</h3>
  </Zoom>
  </div>
  </Grid>
  <Grid item xs={12} sm={5} md={5} lg={5}>
  <div style={{textAlign: "center"}}>
  <Zoom delay={1700}>
    <img src={Four} alt="for"/>
  <h3 id="missionsubtitle">Company that is happy with you will match you</h3>
  </Zoom>
  </div>
  </Grid>
</Grid>
          </div>
          </div>

};

export default Home;
