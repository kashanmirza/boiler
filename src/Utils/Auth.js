import axios from 'axios';
import Constant from '../Common/Constant';
import Model from '../store/Models/Model';
import userAction from '../store/Actions/users'
// import { bindActionCreators } from 'C:/Users/yasir.riaz/AppData/Local/Microsoft/TypeScript/3.4.5/node_modules/redux';


exports.authHeader = function () {
  // return authorization header with jwt token
  let token = localStorage.getItem('Token');
  let tokenDateOn = new Date(localStorage.getItem('DateOn').toString());

  if (token && token.length > 0) {
    let _user = IsTokenExpired(tokenDateOn);
    if (_user.Token.length > 0 && _user.IsAuthorized === true) {
      console.log('axios | Token Verified Sucssessfully')
      return { 'Authorization': 'Bearer ' + _user.token };
    }
    else {
      console.log("axios | Sorry,your token is expired.");
      return {};
    }
  }
  else {
    return {};
  }
}
exports.setAuthorizationToken = function () {

  let token = localStorage.getItem('Token');
  let tokenDateOn = new Date(localStorage.getItem('DateOn').toString());

  if (token.length > 0) {
    let _user = IsTokenExpired(tokenDateOn);
    if (_user.Token.length > 0 && _user.IsAuthorized === true) {
      console.log('axios | Token Verified Sucssessfully')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
      console.log("axios | Sorry,your token is expired.");
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  else { delete axios.defaults.headers.common['Authorization']; }

}
exports.setCurrentUser = function (user) {

  if (user.token != null && user.token.length > 0 && user.username.length > 0) {
    localStorage.setItem('Token', user.token);
    localStorage.setItem('UserName', user.username);
    localStorage.setItem('FirstName', user.firstName);
    localStorage.setItem('LastName', user.lastName);
    localStorage.setItem('IntialName', user.intialName);
    localStorage.setItem('DateOn', new Date());
    localStorage.setItem('RoleName', user.RoleName);
    localStorage.setItem('Permissions', JSON.stringify(user.permissions));
    localStorage.setItem('isAuthenticated', true);
  }

}

exports.CurrentUser = function () {

  let _user = Model.user;
  try {
    if (localStorage.length > 0) {

      let token = localStorage.getItem('Token');
      let tokenDateOn = new Date(localStorage.getItem('DateOn'));

      if (token.length > 0) {
        return IsTokenExpired(tokenDateOn);
      }
      else {
        return {
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
      }
    }
    else {
      return {
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
    }
  }
  catch (err) {
    return _user;
  }
}

exports.IsAuthorized = function () {
  let _user = Model.user;
  try {
    let token = localStorage.getItem('Token');
    let tokenDateOn = new Date(localStorage.getItem('DateOn'));

    if (token.length > 0) {
      return IsTokenExpired(tokenDateOn);
    }
    else { return _user; }
  }
  catch (err) {
    return _user;
  }

}
exports.ClearLocalStorage = function () {
  ClearLocalStorage();
}
function ClearLocalStorage() {
  console.log('ClearLocalStorage();');
  localStorage.removeItem('Token');
  localStorage.removeItem('UserName');
  localStorage.removeItem('FirstName');
  localStorage.removeItem('LastName')
  localStorage.removeItem('IntialName');
  localStorage.removeItem('DateOn')
  localStorage.removeItem('RoleName');
  localStorage.removeItem('Permissions')
  localStorage.removeItem('DateOn');
  localStorage.removeItem('isAuthenticated');

}

function IsTokenExpired(tokenDateOn) {
 // console.log('IsTokenExpired();');
  let Token_Exp_Time_Minutes = Constant.TokenExpiryTime;
  var Last_LoginTime = tokenDateOn;
  var CurrentTime = new Date();
  var diffMs = (CurrentTime - Last_LoginTime); // milliseconds between Last_LoginTime & CurrentTime
  var diffDays = Math.floor(diffMs / 86400000); var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  let TotalDiffInMinutes = diffMins;
  console.log(TotalDiffInMinutes);
  let _user = Model.user;
  if (TotalDiffInMinutes < Token_Exp_Time_Minutes) {
    console.log('Token Verified Sucssessfully. | return true');

    _user.Token = localStorage.getItem('Token');
    _user.UserName = localStorage.getItem('UserName');
    _user.FirstName = localStorage.getItem('FirstName');
    _user.LastName = localStorage.getItem('LastName')
    _user.IntialName = localStorage.getItem('IntialName');
    _user.RoleName = localStorage.getItem('RoleName');
    _user.Permissions = JSON.parse(localStorage.getItem('Permissions'));
    _user.isAuthenticated = true;
    return _user;
  }
  else {
    console.log("Sorry,your token is expired. | return false");
    ClearLocalStorage();
    return {
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
    }

  }

}


// const mapDispatchToProps = dispatch => {
//   return {
//       onAuth : () => dispatch(actions.auth())
//   }
// }


// export default connect(null,mapDispatchToProps)(CurrentUser);

