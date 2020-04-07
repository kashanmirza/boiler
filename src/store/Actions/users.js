import ActionType from '../../Common/ActionType';
import ApiURL from '../../Common/ApiURL';
import Auth from '../../Utils/Auth';
import { userService } from '../../Services/userService';
import history from '../../History';
import Model from '../Models/Model';
import { alertActions } from './alerts';

export function setCurrentUser() {
    return {
        type: ActionType.SET_CURRENT_USER,
        payload: Auth.CurrentUser()
    };
}

export function Authenticate(data) {

   // console.log(data);
    return dispatch => {
        userService.Authenticate(data)
            .then(

                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

function request(user) { return { type: ActionType.LOGIN_REQUEST, user } }
function success(user) {
    console.log('Authenticate successfully');
    return {
        type: ActionType.LOGIN_SUCCESS,
        type: user,
    };
}
function failure(error) {
    console.log('Authenticate successfully');
    return { type: ActionType.LOGIN_FAILURE, error }
}

export function IsAuthorized() {
  //  console.log('IsAuthorized call in Action-User');
    return {
        type: ActionType.CHECK_AUTHORIZED,
        payload: Auth.IsAuthorized(),
    };
}

export const logout = () => {
    console.log("Logout -- userAction")    
    return {
        type: ActionType.SET_CURRENT_USER,
        payload: userService.logout()         
    };
}





