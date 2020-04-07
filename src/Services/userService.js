import { authHeader } from '../Utils/Auth';
import ActionType from '../Common/ActionType';
import ApiURL from '../Common/ApiURL';
import Auth from '../Utils/Auth';
import Model from '../store/Models/Model'

export const userService = {
    Authenticate,
    logout,
    register,
};

function Authenticate(_user) {
   
    let username= _user.username;
    let password= _user.password;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(ApiURL.USER_Authenticate, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("get auth info " , user);
            Auth.setCurrentUser(user);        
            return user;
        });
}

function logout() {
    Auth.ClearLocalStorage();
    let user =  {
        UserName: '',
        Password: '',
        FirstName: '',
        LastName: '',
        IntialName: '',
        Token: '',
        DateOn: '',
        RoleName: '',
        Permissions: {},
        isAuthenticated: false
    };
    return user;//Model.user;
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}