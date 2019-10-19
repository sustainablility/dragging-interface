import iconMouseTracing from "../action/iconMouseTracing";
import getProcedure from "../ajax/getProcedure";
function loadProcedure(workspace) {
    let procedure = getProcedure(window.draggingInterface.procedureName, window.draggingInterface.userToken);
    if (procedure === null || procedure === "") {
        console.log("error");
        return null;
    }
    workspace.innerHTML = procedure["procedure"];
    let iconsFrame = workspace.getElementsByClassName("dragging-icon-frame");
    for (let iconFrame of iconsFrame){
        let iconForClick = iconFrame.getElementsByClassName("dragging-icon")[0];
        iconMouseTracing(iconFrame,iconForClick,workspace);
    }
}
export default loadProcedure;