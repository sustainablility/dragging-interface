function getData(url) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open("GET",url,true);
        ajax.send(null);
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

export default getData;