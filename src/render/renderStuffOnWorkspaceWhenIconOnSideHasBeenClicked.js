import iconMouseTracing from "../action/iconMouseTracing";
import iconFingerTracing from "../action/iconFingerTracing";
import createLine from '../action/createLine';
import idGenerator from '../lib/randomIDGenerator';

function render(workspace,iconType,elementID) {
    
    // Initialize element frame
    let newElementFrame = document.createElement("div");
    newElementFrame.className = "dragging-icon-frame";
    newElementFrame.id = elementID;
    
    // Initialize element
    let newElement = document.createElement("div");
    
    // Chose the element
    switch (iconType) {
        case "datavalue":
            newElement.classList.add("dragging-datavalue");
            break;
        case "database":
            newElement.classList.add("dragging-database");
            break;
        case "tool":
            newElement.classList.add("dragging-tool");
            break;
        case "process":
            newElement.classList.add("dragging-process");
            break;
        default:
            throw new Error("icon type invalid");
    }
    
    // Set initial Position
    newElementFrame.style.top = "30%";
    newElementFrame.style.left = "30%";
    
    // Apply mouse and finger tracing
    iconMouseTracing(newElementFrame,newElement,workspace);
    iconFingerTracing(newElementFrame);
    
    // Apply connecting point

    createConnectingPointIn(workspace,newElementFrame,25);
    createConnectingPointIn(workspace,newElementFrame,75);
    createConnectingPointOut(workspace,newElementFrame,25);
    createConnectingPointOut(workspace,newElementFrame,75);
    
    
    newElementFrame.append(newElement);
    workspace.append(newElementFrame);
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