function removeConnectingPoints(element) {
    let points = element.querySelectorAll(".dragging-icon-connecting-point");
    for(let point of points) {
        element.removeChild(point);
    }
}

export default removeConnectingPoints;