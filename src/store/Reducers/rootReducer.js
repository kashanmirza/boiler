
import {  combineReducers } from 'redux';
import users from './users';
import  {alert}  from './alerts';
import role from './role';
import userManagement from './userManagement'

export default combineReducers({
  reducerUser: users,
  alert :alert,
  reducerRole: role,
  reducerUserManagement : userManagement
});