import iconMouseTracing from "../action/iconMouseTracing";
import createLine from "./createLine";
function loadProcedure(workspace, procedure) {
    if (procedure === null || procedure === "") {
        return null;
    }
    workspace.innerHTML = procedure;
    let iconsFrame = workspace.getElementsByClassName("dragging-icon-frame");
    for (let iconFrame of iconsFrame){
        let iconForClick = iconFrame.getElementsByClassName("dragging-icon")[0];
        iconMouseTracing(iconFrame,iconForClick,workspace);
    }
    let connectingPointsOut = workspace.getElementsByClassName("dragging-icon-connecting-point-position-out");
    for (let connectingPoint of connectingPointsOut) {
        createLine(workspace, connectingPoint);
    }
}
export default loadProcedure;