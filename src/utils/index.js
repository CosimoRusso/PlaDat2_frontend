import Cookies from "universal-cookie";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;
const cookies = new Cookies();

const out = {
    api: (path) => {
        let basePath = '/api/v1/';
        if (path.startsWith('/')) basePath = '/api/v1';
        return new URL(basePath + path, apiUrl);
    },
    post : async (path, data, jwt = null) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        if (jwt)
            options.headers["Authorization"] = 'Bearer ' + jwt;
        const url = out.api(path);
        const req = await fetch(url, options);
        const res = await req.json();
        return { status: req.status, data: res };
    },
    get : async (path, query, jwt = null) => {
        let queryString = '';
        if (query){
            query='?';
            for (let [k, v] of Object.entries(query)){
                queryString += `${k}=${v}&`;
            }
        }
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        if (jwt)
            options.headers["Authorization"] = 'Bearer ' + jwt;
        const url = out.api(path + queryString);
        const req = await fetch(url, options);
        const res = await req.json();
        return { status: req.status, data: res };
    },
    setSessionCookies: (jwt, userId, userType) => {
        const expires = jwt ? new Date('01-01-2030') : new Date('01-01-2000');
        cookies.set('jwt', jwt, { path: '/', expires });
        cookies.set('userId', userId, { path: '/', expires });
        cookies.set('userType', userType, { path: '/', expires });
    }
}

export default out;