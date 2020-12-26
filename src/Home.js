import React, {useContext} from "react";
import Navbar from "./components/Navbar";
import { Redirect } from 'react-router-dom';

const {UserContext} = require('./utils/user-context');

const Home = () => {
  const { user } = useContext(UserContext);

  if(user) {
    if (user.userType === 'student')
      return <Redirect to={'/dashboard'} />
    else
      return <Redirect to={'company/dashboard'} />
  }

  return <div>
    <Navbar/>
    home page</div>;
};

export default Home;
