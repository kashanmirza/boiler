import Constant  from '../../Common/Constant';

export const alertActions = {
    success,
    error,
    clear
};

 function success(message) {
    return { type: Constant.SUCCESS, message };
}

 function error(message) {
    return { type: Constant.ERROR, message };
}

 function clear() {
    return { type: Constant.CLEAR };
}