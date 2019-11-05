function run(url, dataIn) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open("POST",url,true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(dataIn));
        ajax.onload = () => {
            if (ajax.status === 200) {
                let resultObject;
                try {
                    resultObject = JSON.parse(ajax.responseText);
                }catch (e) {
                    reject("Response text is not json");
                }
                resolve(resultObject);
            }else {
                reject("Network error");
            }
        };
    });
}

export default run;