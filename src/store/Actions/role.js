import axios from 'axios';
import ActionType from '../../Common/ActionType';
import ApiURL from '../../Common/ApiURL';
import { roleService } from '../../Services/roleService'
import { alertActions } from './alerts';


/***************************      ACCESSING REDUX STORE STARTED    *********************** */

export const RolePermissionStart = () => {
    return {
        type: ActionType.ROLE_PERMISSION_START,
        loading: true,
        error: null,
        successMsg: null
    }
};

export const RolePermissionSuccess = () => {

    return {
        type: ActionType.ROLE_PERMISSION_SUCCESS,
        loading: false,
        successMsg: true,
        error: null,
        Id: null,
        checked: [],
        properties: null,
        status: null
    }
};


export const ApproveRolePermissionSuccess = () => {

    return {
        type: ActionType.ROLE_APPROVE_ROLE,
        loading: false,
        successMsg: true,
        error: null,
        Id: null,
        checked: [],
        properties: null
    }
};

export const RolePermissionFail = (error) => {

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
        type: ActionType.ROLE_PERMISSION_FAIL,
        error: errorMessage,
        loading: false,
        successMsg: false
    }
};


export function setAllRolePermission(res) {
    return {
        type: ActionType.GET_ALL_ROLES_NODE,
        payload: res,
        error: null
    };
}

export function setCheckedNode(res) {
    return {
        type: ActionType.ROLE_GET_CHECKED_NODES,
        checked: res.permissions,
        loading: false,
        error: null,
        successMsg: null,
        properties: res.role
    };
}

export function setAllUsers(res) {
    return {
        type: ActionType.ROLE_GET_USERS,
        user: res,
        error: null
    };
}

export function SaveIdForRoles(data) {
    return {
        type: ActionType.ROLE_SAVE_ID,
        Id: data.Id,
        loading: false,
        error: null,
        successMsg: null,
        checked: [],
        properties: null,
        status: data.Status
    };
}


export function setAllRoles(res) {
    return {
        type: ActionType.ROLE_GET_ALL_ROLES,
        role: res
    };
}

export function ClearAllState(page) {

    if (page == "Edit") {

        console.log("edit");
        return {
            type: ActionType.ROLE_CLEAR_STATE,
            loading: false,
            error: null,
            successMsg: null,
            users: [],
            roles: []
        };
    } else if (page == "No") {
        console.log("no")
        return {
            type: ActionType.ROLE_CLEAR_ALL_STATE,
            loading: false,
            error: null,
            successMsg: null,
            users: [],
            roles: [],
            Id: null,
            checked: [],
            properties: null
        };
    }
}

export function setAllRolesData(res) {
    return {
        type: ActionType.ROLE_SAVE_ROLE_DATA_INTO_GRID,
        rolesGrid: res
    };
}




export function ClearState(page) {
    return dispatch => {
        dispatch(ClearAllState(page));
    }
}


/***************************      ACCESSING REDUX STORE ENDED    ***************************** */


/***************************       SERVICES STARTED    ***************************************** */


export function GetUsers() {

    return dispatch => {
        return roleService.GetUsers()
            .then(response => {
                dispatch(setAllUsers(response));
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}


export function GetRoles(data) {

    return dispatch => {
        return roleService.GetRoles(data)
            .then(response => {
                dispatch(setAllRoles(response));
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}



export function SaveRolePermission(data) {

    return dispatch => {
        dispatch(RolePermissionStart());

        return roleService.saveRolePermission(data)
            .then(response => {
                dispatch(RolePermissionSuccess());
            },
                err => {
                    dispatch(RolePermissionFail(err))
                    dispatch(alertActions.error(err));
                }
            );
    };
}

export function SaveIdForRole(data) {

    return dispatch => {
        dispatch(SaveIdForRoles(data));

        const Permissions = {
            Permission: data
        }

        return roleService.SaveIdForRole(Permissions)
            .then(response => {
                 dispatch(setCheckedNode(response));
            },
                err => {
                    dispatch(RolePermissionFail(err))
                    dispatch(alertActions.error(err));
                }
                );
    };
}

export function GetAllPermission() {

    return dispatch => {

        return roleService.GetAllPermission()
            .then(response => {
                dispatch(setAllRolePermission(response));
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}

export function GetPermissionById(data) {

    return dispatch => {

        return roleService.GetPermissionById(data)
            .then(response => {
                dispatch(setCheckedNode(response));
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}


export function ApproveRole(data) {

    return dispatch => {
        dispatch(RolePermissionStart());
        return roleService.ApproveRole(data)
            .then(response => {
                dispatch(ApproveRolePermissionSuccess());
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}

export function RejectRole(data) {

    return dispatch => {
        dispatch(RolePermissionStart());
        return roleService.RejectRole(data)
            .then(response => {
                dispatch(ApproveRolePermissionSuccess());
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}


export function UpdateRolePermission(data) {

    return dispatch => {
        dispatch(RolePermissionStart());
        return roleService.UpdateRolePermission(data)
            .then(response => {
                dispatch(RolePermissionSuccess());
                //dispatch(ApproveRolePermissionSuccess());
            },
                err => {
                    dispatch(RolePermissionFail(err));
                    dispatch(alertActions.error(err));
                }
            );
    };
}



/***************************     SERVICES ENDED    ***************************************** */



