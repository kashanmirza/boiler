
import ActionType from '../../Common/ActionType';

const INITIAL_STATE = {
    allRolePermission: [],
    loading: false,
    error: null,
    successMsg: null,
    users: [],
    roles: null,
    Id: null,
    checked: [],
    properties:null,
    status:null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionType.GET_ALL_ROLES_NODE:
            return ({
                ...state,
                allRolePermission: action.payload,
                error: action.error
            })

        case ActionType.ROLE_PERMISSION_START:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg
            })

        case ActionType.ROLE_PERMISSION_SUCCESS:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                successMsg: action.successMsg,
                checked: action.checked,
                properties: action.properties,
                status:action.status
            })

        case ActionType.ROLE_PERMISSION_FAIL:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg
            })

        case ActionType.ROLE_GET_USERS:
            return ({
                ...state,
                users: action.user,
                error: action.error
            })

        case ActionType.ROLE_GET_ALL_ROLES:
            return ({
                ...state,
                roles: action.role
            })


        case ActionType.ROLE_SAVE_ID:
            return ({
                ...state,
                Id: action.Id,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                checked: action.checked,
                properties: action.properties,
                status:action.status
            })

        case ActionType.ROLE_GET_CHECKED_NODES:
            return ({
                ...state,
                checked: action.checked,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                properties: action.properties
            })

        case ActionType.ROLE_CLEAR_ALL_STATE:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                users: action.users,
                roles: action.roles,
                Id: action.Id,
                checked: action.checked,
                properties: action.properties
            })

        case ActionType.ROLE_CLEAR_STATE:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                users: action.users,
                roles: action.roles

            })

        case ActionType.ROLE_APPROVE_ROLE:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                checked: action.checked,
                Id:action.Id,
                properties: action.properties

            })

        default:
            return state;
    }

}