import {createConnectingPointIn,createConnectingPointOut} from "../connectingLine/createConnectingPoint";

function createConnectingPointsIn(element, number) {
    let pointIDs = [];
    let workspace = document.getElementById("dragging-frame-main");
    let distanceBetweenEach = 100 / (number + 1);
    for (let i = distanceBetweenEach;i < 100; i = i + distanceBetweenEach) {
        pointIDs.push(createConnectingPointIn(workspace, element, i));
    }
    return pointIDs;
}

function createConnectingPointsOut(element, number) {
    let pointIDs = [];
    let workspace = document.getElementById("dragging-frame-main");
    let distanceBetweenEach = 100 / (number + 1);
    for (let i = distanceBetweenEach;i < 100; i = i + distanceBetweenEach) {
        pointIDs.push(createConnectingPointOut(workspace, element, i));
    }
    return pointIDs;
}

export {createConnectingPointsIn, createConnectingPointsOut}