import { authHeader } from '../Utils/Auth';
import ActionType from '../Common/ActionType';
import ApiURL from '../Common/ApiURL';
import Auth from '../Utils/Auth';
import Model from '../store/Models/Model'
import { ApiService } from '../Common/ApiCall';


export const roleService = {
    GetUsers,
    saveRolePermission,
    GetRoles,
    SaveIdForRole,
    GetAllPermission,
    GetPermissionById,
    ApproveRole,
    RejectRole,
    UpdateRolePermission
};

function saveRolePermission(data) {
    return ApiService.POST(data,ApiURL.ROLE_Save_Role_Permission);
}

function GetUsers() {
    return ApiService.GET('data',ApiURL.ROLE_Get_All_Users);
}

function GetRoles(data) {
    return ApiService.POST(data,ApiURL.ROLE_Search_Role);
}

function SaveIdForRole(data) {
    return ApiService.POST(data,ApiURL.ROLE_GetAll_Checked_Permission_By_Id);
}

function GetAllPermission() {
     return ApiService.GET('data',ApiURL.ROLE_GetAll_Permission);
}


function GetPermissionById(data) {
    return ApiService.POST(data,ApiURL.ROLE_GetAll_Checked_Permission_By_Id);
}

function ApproveRole(data) {
    return ApiService.POST(data,ApiURL.ROLE_Approve_Role);
}

function RejectRole(data) {
    return ApiService.POST(data,ApiURL.ROLE_Reject_Role);
}

function UpdateRolePermission(data) {
    return ApiService.POST(data,ApiURL.ROLE_Update_Role_Permission);
}
