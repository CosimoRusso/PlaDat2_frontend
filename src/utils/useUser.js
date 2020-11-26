import {useState, useEffect} from 'react';
import Cookies from "universal-cookie";

function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const cookies = new Cookies();
        const jwt = cookies.get('jwt');
        const userId = cookies.get('userId');
        const userType = cookies.get('userType');
        if(jwt && userId && userType){
            setUser({
                id: userId,
                jwt,
                userType
            });
        }else{
            setUser(null);
        }
    }, [user]);

    return user;
}

export default useUser;