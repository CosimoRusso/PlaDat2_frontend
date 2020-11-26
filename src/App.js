import React, {useState} from "react";
import Router from "./Router";
import Cookies from "universal-cookie";
const { UserContext } = require('./utils/user-context');
const cookies = new Cookies();

export default function App() {
    const [user, setUser] = useState(getUserFromCookies());

  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
            <Router/>
        </UserContext.Provider>
    </div>
  );
}

function getUserFromCookies(){
    const jwt = cookies.get('jwt');
    const userId = cookies.get('userId');
    const userType = cookies.get('userType');
    if (jwt && userId && userType){
        return {jwt, userId, userType};
    }else{
        return null;
    }
}