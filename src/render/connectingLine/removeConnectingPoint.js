function removeConnectingPoints(element) {
    let points = element.getElementsByClassName("dragging-icon-connecting-point");
    for(let point of points) {
        element.removeChild(point);
    }
}

export default removeConnectingPoints;