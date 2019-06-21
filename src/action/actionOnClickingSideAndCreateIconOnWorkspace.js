import iconMouseTracing from './iconMouseTracing';
import iconFingerTracing from './iconFingerTracing';
function actionOnClickingSide(workspace,iconType) {
    let newElement = document.createElement("div");
    switch (iconType) {
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
    newElement.style.top = "30%";
    newElement.style.left = "30%";
    iconMouseTracing(newElement);
    iconFingerTracing(newElement);
    workspace.append(newElement);
}

export default actionOnClickingSide;