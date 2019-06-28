import iconMouseTracing from "../action/iconMouseTracing";
import iconFingerTracing from "../action/iconFingerTracing";

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
    iconMouseTracing(newElementFrame);
    iconFingerTracing(newElementFrame);
    
    // Apply connecting point
    let connectingPoints = [];
    
    for (let i = 0;i < 4; i ++) {
        let connectingPoint = document.createElement("div");
        connectingPoint.classList.add("dragging-icon-connecting-point");
        connectingPoint.classList.add("dragging-icon-connecting-point-position-" + String(i));
        newElementFrame.append(connectingPoint);
        connectingPoints.push(connectingPoint);
    }
    
    
    newElementFrame.append(newElement);
    workspace.append(newElementFrame);
    console.log("Added");
}

export default render;