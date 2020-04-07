import Constants  from '../../Common/Constant';

export function alert(state = {}, action) {
  switch (action.type) {
    case Constants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case Constants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case Constants.CLEAR:
      return {};
    default:
      return state
  }
}