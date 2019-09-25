import {cacheAPIPutDataAPI}  from "../../config";
function putData(url) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST",cacheAPIPutDataAPI,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({
        url: url,
        method: "Get"
    }));
    if (ajax.status === 200) {
        return ajax.responseText;
    }else {
        return null;
    }
}

export default putData;
// putData({"a":1});
