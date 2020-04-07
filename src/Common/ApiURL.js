
 const BaseUrl = 'http://localhost:53330/api';



module.exports = {
    USER_Authenticate : BaseUrl+'/Users/Authenticate',
    USER_GetAllPublic: BaseUrl+'/Users/GetAllPublic',
    USER_GetAll: BaseUrl+'/Users/GetAll',

    
    ROLE_GetAll_Permission: BaseUrl+'/Role/GetAllPermisssions',
    ROLE_Save_Role_Permission: BaseUrl+'/Role/SaveRolePermisssions',
    ROLE_Get_All_Users: BaseUrl+'/Role/GetAllUsers',
    ROLE_GetAll_Checked_Permission_By_Id: BaseUrl+'/Role/GetPermisssionsById',

    ROLE_Approve_Role: BaseUrl+'/Role/ApproveRole',
    ROLE_Reject_Role: BaseUrl+'/Role/RejectRole',
    ROLE_Search_Role: BaseUrl+'/Role/SearchRole',
    ROLE_Update_Role_Permission: BaseUrl+'/Role/UpdateRolePermission',

    USER_MANAGEMENT_Search_User: BaseUrl+'/Role/SearchAll',
    USER_MANAGEMENT_GetAll_Checked_Permission_By_Id: BaseUrl+'/Role/GetUserManagementPermisssionsById',
    USER_MANAGEMENT_Search_Active_Role: BaseUrl+'/Role/GetActiveRole',
    USER_MANAGEMENT_Save_Role_Permission : BaseUrl + '/Role/SaveUserPermission',
    USER_MANAGEMENT_Approve_User: BaseUrl+'/Role/ApproveUserManagement',
    USER_MANAGEMENT_Reject_User: BaseUrl+'/Role/RejectUserManagement',
    USER_MANAGEMENT_Update_User_Permission: BaseUrl+'/Role/UpdateUserPermission',

}