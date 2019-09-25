import {cacheAPIPutData}  from "../../config";
function putData(data) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST",cacheAPIPutData,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(data));
    if (ajax.status === 200) {
        return ajax.responseText;
    }else {
        return null;
    }
}

export default putData;
// putData({"a":1});
