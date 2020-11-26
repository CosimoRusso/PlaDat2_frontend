const apiUrl = process.env.REACT_APP_API_ENDPOINT;

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

}

export default out;