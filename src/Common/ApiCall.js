import ActionType from '../Common/ActionType';
import Auth from '../Utils/Auth';

export const ApiService = {
    POST,
    GET
}


export function POST(data,URL) {
    
    let token = localStorage.getItem('Token');
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization' :  token,  'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(URL, requestOptions).then(handleResponse);
}

export function GET(data,URL){
   
    let token = localStorage.getItem('Token');
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization' :  token, 'Content-Type': 'application/json' },
    
    };

    return fetch(URL, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
       
        if (isJson(text)) {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    Auth.logout();
                    location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }
        return text;
    });
}


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}