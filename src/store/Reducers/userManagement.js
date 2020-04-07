
import ActionType from '../../Common/ActionType';

const INITIAL_STATE = {
    allRolePermission: [],
    loading: false,
    error: null,
    successMsg: null,
    users: [],
    usersManagementData: null,
    Id: null,
    checked: [],
    properties:null,
    status:null,
    activeRoles: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // case ActionType.GET_ALL_ROLES_NODE:
        //     return ({
        //         ...state,
        //         allRolePermission: action.payload,
        //         error: action.error
        //     })

        case ActionType.USER_MANAGEMENT_PERMISSION_START:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg
            })

        case ActionType.USER_MANAGEMENT_PERMISSION_SUCCESS:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                checked: action.checked,
                properties: action.properties,
                status:action.status,
                Id:action.Id
            })

        case ActionType.USER_MANAGEMENT_PERMISSION_FAIL:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg
            })

        // case ActionType.ROLE_GET_USERS:
        //     return ({
        //         ...state,
        //          users: action.user,
        //         error: action.error
        //     })

        case ActionType.USER_MANAGEMENT_GET_ALL_USERS:
            return ({
                ...state,
                usersManagementData: action.usersManagementData
            })


        case ActionType.USER_MANAGEMENT_SAVE_ID:
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

        case ActionType.USER_MANAGEMENT_GET_CHECKED_NODES:
            return ({
                ...state,
                checked: action.checked,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                properties: action.properties
            })

        case ActionType.USER_MANAGEMENT_CLEAR_ALL_STATE:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                users: action.users,
                usersManagementData: action.usersManagementData,
                Id: action.Id,
                checked: action.checked,
                properties: action.properties
            })

        case ActionType.USER_MANAGEMENT_CLEAR_STATE:
            return ({
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: action.successMsg,
                users: action.users,
                usersManagementData: action.usersManagementData

            })

            case ActionType.USER_MANAGEMENT_GET_ALL_ROLES:
                return ({
                    ...state,
                    activeRoles: action.activeRole
                })


        case ActionType.USER_MANAGEMENT_APPROVE_USER:
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