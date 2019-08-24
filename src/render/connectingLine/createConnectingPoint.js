import idGenerator from "../../lib/randomIDGenerator";
import createLine from "../../action/createLine";

function createConnectingPointIn(workspace, newElementFrame, distanceToLeft) {
    let connectingPoint = document.createElement("div");
    connectingPoint.classList.add("dragging-icon-connecting-point");
    connectingPoint.classList.add("dragging-icon-connecting-point-position-in");
    connectingPoint.style.left = distanceToLeft + "%";
    connectingPoint.id = idGenerator();
    newElementFrame.append(connectingPoint);
    return connectingPoint.id;
}

function createConnectingPointOut(workspace, newElementFrame, distanceToLeft) {
    let connectingPoint = document.createElement("div");
    connectingPoint.classList.add("dragging-icon-connecting-point");
    connectingPoint.classList.add("dragging-icon-connecting-point-position-out");
    connectingPoint.style.left = distanceToLeft + "%";
    connectingPoint.id = idGenerator();
    createLine(workspace,connectingPoint);
    newElementFrame.append(connectingPoint);
    return connectingPoint.id;
}

export {createConnectingPointIn,createConnectingPointOut};