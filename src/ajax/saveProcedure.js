let config = require("../config");
function saveProcedure(procedureName, userToken, procedureData) {
    let ajax = new XMLHttpRequest();
    let postData = {
        procedureName: procedureName,
        procedure: procedureData,
        userToken: userToken
    };
    ajax.open("POST",config.procedureManagementAPI.updateProcedure,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(postData));
    if (ajax.status === 200) {
        return ajax.responseText === "1"
    }else {
        return null;
    }
}

export default saveProcedure;