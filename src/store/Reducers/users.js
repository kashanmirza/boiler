
import ActionType from '../../Common/ActionType';
import Model from '../Models/Model'

const INITIAL_STATE = {
    user: Model.user
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionType.SET_CURRENT_USER:

           // console.log("action.payload  == ",action.payload)
            return ({
                ...state,
                user: action.payload,
            })

        case ActionType.CHECK_AUTHORIZED:
            return ({
                ...state,
                user: action.payload,
            })

        case ActionType.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ActionType.LOGIN_SUCCESS:
            return {                
                 ...state,
                user: action.payload
            };
        case ActionType.LOGIN_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }

}