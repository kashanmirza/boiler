import { authHeader } from '../Utils/Auth';
import ActionType from '../Common/ActionType';
import ApiURL from '../Common/ApiURL';
import Auth from '../Utils/Auth';
import Model from '../store/Models/Model';
import { ApiService } from '../Common/ApiCall';

export const userManagementService = {
    GetAllUsers,
    getPermissionById,
    GetActiveRoles,
    SaveUserPermission,
    ApproveUser,
    RejectUser,
    UpdateUserPermission
};

function GetAllUsers(data) {
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_Search_User);
}


function getPermissionById(data) {
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_GetAll_Checked_Permission_By_Id);
}


function GetActiveRoles() {
    return ApiService.GET('data',ApiURL.USER_MANAGEMENT_Search_Active_Role);
}

function SaveUserPermission(data) {
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_Save_Role_Permission);
}

function ApproveUser(data) {
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_Approve_User);
}

function RejectUser(data) {
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_Reject_User);
}

function UpdateUserPermission(data){
    return ApiService.POST(data,ApiURL.USER_MANAGEMENT_Update_User_Permission);
}
