function run(url, dataIn) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST",url,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(dataIn));
    if (ajax.status === 200) {
        return JSON.parse(ajax.responseText);
    }else {
        return null;
    }
}

export default run;