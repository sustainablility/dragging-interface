import actionOnClickingIcon from '../action/actionOnClickingSideAndCreateIconOnWorkspace';
import {initialCreate} from "./iconCreateAndRender";

async function iconOnSide(father) {

    let data = initialCreate("data");
    let tool = initialCreate("tool");
    let procedure = initialCreate("procedure");
    let output = initialCreate("output");

    let dataFrame = document.createElement("div");
    dataFrame.classList.add("dragging-icon-side-frame");
    dataFrame.append(data[0]);

    let toolFrame = document.createElement("div");
    toolFrame.classList.add("dragging-icon-side-frame");
    toolFrame.append(tool[0]);

    let procedureFrame = document.createElement("div");
    procedureFrame.classList.add("dragging-icon-side-frame");
    procedureFrame.append(procedure[0]);

    let outputFrame = document.createElement("div");
    outputFrame.classList.add("dragging-icon-side-frame");
    outputFrame.append(output[0]);

    let workspace = document.getElementById("dragging-frame-main");

    dataFrame.onclick = () => {
        actionOnClickingIcon(workspace,"data");
    };
    toolFrame.onclick = () => {
        actionOnClickingIcon(workspace,"tool");
    };
    procedureFrame.onclick = () => {
        actionOnClickingIcon(workspace,"procedure");
    };
    outputFrame.onclick = () => {
        actionOnClickingIcon(workspace,"output");
    };

    father.append(dataFrame);
    father.append(toolFrame);
    father.append(procedureFrame);
    father.append(outputFrame);
}

export default iconOnSide;