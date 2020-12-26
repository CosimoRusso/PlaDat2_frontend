import React, {useState} from "react";
import Router from "./Router";
import Cookies from "universal-cookie";
import { SnackbarProvider } from 'notistack';
import {Button} from "@material-ui/core";

const { UserContext } = require('./utils/user-context');
const cookies = new Cookies();

export default function App() {
    const [user, setUser] = useState(getUserFromCookies());
    const notistackRef = React.createRef();

    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    }

  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
                <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    ref={notistackRef}
                    action={(key) => (<Button style={{color:"white", fontSize: "1.5em"}} onClick={onClickDismiss(key)}>×</Button>)}
                >
                    <Router/>
                </SnackbarProvider>
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