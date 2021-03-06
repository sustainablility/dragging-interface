import iconMouseTracing from "../action/iconMouseTracing";
import createLine from '../action/createLine';
import idGenerator from '../lib/randomIDGenerator';
import {initialCreate} from "./iconCreateAndRender";

function render(workspace,iconType,elementID) {
    
    // Initialize element
    let newElement = initialCreate(iconType);
    newElement[0].id = elementID;
    // Set initial Position
    newElement[0].style.top = "30%";
    newElement[0].style.left = "30%";

    // Apply mouse and finger tracing
    iconMouseTracing(newElement[0],newElement[1],workspace);

    workspace.append(newElement[0]);
}

function createConnectingPointIn(workspace, newElementFrame, distanceToLeft) {
    let connectingPoint = document.createElement("div");
    connectingPoint.classList.add("dragging-icon-connecting-point");
    connectingPoint.classList.add("dragging-icon-connecting-point-position-in");
    connectingPoint.style.left = distanceToLeft + "%";
    connectingPoint.id = idGenerator();
    newElementFrame.append(connectingPoint);
}

function createConnectingPointOut(workspace, newElementFrame, distanceToLeft) {
    let connectingPoint = document.createElement("div");
    connectingPoint.classList.add("dragging-icon-connecting-point");
    connectingPoint.classList.add("dragging-icon-connecting-point-position-out");
    connectingPoint.style.left = distanceToLeft + "%";
    connectingPoint.id = idGenerator();
    createLine(workspace,connectingPoint);
    newElementFrame.append(connectingPoint);
}

export default render;