import axios from 'axios';
import ActionType from '../../Common/ActionType';
import ApiURL from '../../Common/ApiURL';
import Auth from '../../Utils/Auth';
import { userService } from '../../Services/userService';
import history from '../../History';
import Model from '../Models/Model';
import { alertActions } from './alerts';
import { userManagementService } from '../../Services/userManagementService'


/***************************      ACCESSING REDUX STORE STARTED    *********************** */

export function ClearAllState(page) {

    if (page == "Edit") {

        console.log("edit");
        return {
            type: ActionType.USER_MANAGEMENT_CLEAR_STATE,
            loading: false,
            error: null,
            successMsg: null,
            users: [],
            usersManagementData: []
        };
    } else if (page == "No") {
        console.log("no")
        return {
            type: ActionType.USER_MANAGEMENT_CLEAR_ALL_STATE,
            loading: false,
            error: null,
            successMsg: null,
            users: [],
            usersManagementData: [],
            Id: null,
            checked: [],
            properties: null
        };
    }
}

export const UserPermissionStart = () => {
    return {
        type: ActionType.USER_MANAGEMENT_PERMISSION_START,
        loading: true,
        error: null,
        successMsg: null
    }
};

export const UserPermissionSuccess = () => {

    return {
        type: ActionType.USER_MANAGEMENT_PERMISSION_SUCCESS,
        loading: false,
        successMsg: true,
        error: null,
        Id: null,
        checked: [],
        properties: null,
        status: null
    }
};

export function SaveIdForUserManagementData(data) {
    return {
        type: ActionType.USER_MANAGEMENT_SAVE_ID,
        Id: data.Id,
        loading: false,
        error: null,
        successMsg: null,
        checked: [],
        properties: null,
        status: data.Status
    };
}

export function setCheckedNode(res) {

    return {
        type: ActionType.USER_MANAGEMENT_GET_CHECKED_NODES,
        checked: res.permissions,
        loading: false,
        error: null,
        successMsg: null,
        properties: res.userManagement
    };
}

export function setAllUsersData(res) {
    return {
        type: ActionType.USER_MANAGEMENT_GET_ALL_USERS,
        usersManagementData: res
    };
}

export function setAllRoles(res) {
    return {
        type: ActionType.USER_MANAGEMENT_GET_ALL_ROLES,
        activeRole: res
    };
}

export const ApproveUserManagementPermissionSuccess = () => {

    return {
        type: ActionType.USER_MANAGEMENT_APPROVE_USER,
        loading: false,
        successMsg: true,
        error: null,
        Id: null,
        checked: [],
        properties: null
    }
};

export const UserPermissionFail = (error) => {

    let errorMessage = null;
    if (error.response != null) {
        if (error.response.status == "400") {
            errorMessage = "Server Error";
        }
        else if (error.response.status == "404") {
            errorMessage = "Record Not Found";
        }
    }
    else if (error.message != null) {
        errorMessage = error.message;
    }

    return {
        type: ActionType.USER_MANAGEMENT_PERMISSION_FAIL,
        error: errorMessage,
        loading: false,
        successMsg: false
    }
}


export function ClearState(page) {
    return dispatch => {
        dispatch(ClearAllState(page));
    }
}

/***************************      ACCESSING REDUX STORE ENDED    ***************************** */


/***************************       SERVICES STARTED    ***************************************** */

export function GetAllUsers(data) {

    return dispatch => {
        userManagementService.GetAllUsers(data)
            .then(response => {
                dispatch(setAllUsersData(response));
            },
                err => {
                    dispatch(UserPermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}

export function SaveIdForUserManagement(data) {
    return async dispatch => {

        dispatch(SaveIdForUserManagementData(data));
        const Permissions = {
            Permission: data
        }

      return userManagementService.getPermissionById(Permissions)
            .then(
                res => {
                    dispatch(setCheckedNode(res));
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(alertActions.error(error));
                }
            );

    }
}

export function GetActiveRoles() {

    return dispatch => {
        userManagementService.GetActiveRoles()
            .then(response => {
                    dispatch(setAllRoles(response));
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(UserPermissionFail(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

export function SaveUserPermission(data) {

    return dispatch => {
        dispatch(UserPermissionStart());
       return userManagementService.SaveUserPermission(data)
            .then(response => {
                    dispatch(UserPermissionSuccess());
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(UserPermissionFail(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

export function ApproveUser(data) {

    return dispatch => {
        
        dispatch(UserPermissionStart());

       return userManagementService.ApproveUser(data)
            .then(response => {
                    dispatch(ApproveUserManagementPermissionSuccess());
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(UserPermissionFail(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

export function RejectUser(data) {

    return dispatch => {
        
        dispatch(UserPermissionStart());

       return userManagementService.RejectUser(data)
            .then(response => {
                    dispatch(ApproveUserManagementPermissionSuccess());
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(UserPermissionFail(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

export function UpdateUserPermission(data) {

    return dispatch => {
        
        dispatch(UserPermissionStart());

       return userManagementService.UpdateUserPermission(data)
            .then(response => {
                dispatch(UserPermissionSuccess());
                },
                error => {
                    console.log('ERROR: ', error);
                    dispatch(UserPermissionFail(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}


/***************************     SERVICES ENDED    ***************************************** */







