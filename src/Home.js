import React, {useContext} from "react";
import Navbar from "./components/Navbar";
import { Redirect } from 'react-router-dom';

const {UserContext} = require('./utils/user-context');

const Home = props => {
  const { user } = useContext(UserContext);

  if(user) return <Redirect to={'/dashboard'} />

  return <div>
    <Navbar/>
    home page</div>;
};

export default Home;
