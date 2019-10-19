let config = require("../config");
function getProcedure(procedureName, userToken) {
    let ajax = new XMLHttpRequest();
    let postData = {
        procedureName: procedureName,
        userToken: userToken
    };
    ajax.open("POST",config.procedureManagementAPI.getProcedure,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(postData));
    if (ajax.status === 200) {
        return JSON.parse(ajax.responseText);
    }else {
        return null;
    }
}

export default getProcedure;