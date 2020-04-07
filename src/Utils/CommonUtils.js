

exports.ParserUserMenuPermission = function (Permissionlist) {

    let MenuPermission = [];
    for (let i = 0; i < Permissionlist.length; i++) {
        if (Permissionlist[i].isModule === 1) {

            MenuPermission.push(Permissionlist[i]);
        }
    }
    return MenuPermission;
}

exports.ParserUserRoutesPermission = function (Permissionlist) {

    let MenuPermission = [];
    for (let i = 0; i < Permissionlist.length; i++) {

        if (Permissionlist[i].type.toLocaleUpperCase() === "Module".toLocaleUpperCase()
            || Permissionlist[i].type.toLocaleUpperCase() === "Page".toLocaleUpperCase()) {

            MenuPermission.push(Permissionlist[i]);
        }
    }
    return MenuPermission;
}


exports.HasPermission = function (PermissionName) {

    let IsPermission = false;
    let Permissionlist = JSON.parse(localStorage.getItem('Permissions'));
    for (let i = 0; i < Permissionlist.length; i++) {

        if (Permissionlist[i].type.toLocaleUpperCase() === "Action".toLocaleUpperCase()) {
            console.log("HasPermission ( " + PermissionName.toLocaleUpperCase() + " == "+Permissionlist[i].permissionName.toLocaleUpperCase()+" )");
            if (Permissionlist[i].permissionName.toLocaleUpperCase() === PermissionName.toLocaleUpperCase()) {                
                IsPermission = true;
                console.log("HasPermission : " + PermissionName + "  ", IsPermission);
            }
        }
    }
    return IsPermission;
}