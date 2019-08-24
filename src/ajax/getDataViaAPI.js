function getData(url) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET",url,false);
    ajax.send(null);
    if (ajax.status === 200) {
        return JSON.parse(ajax.responseText);
    }else {
        return null;
    }
}

export default getData;