import iconMouseTracing from "../action/iconMouseTracing";
function loadProcedure(workspace, procedure) {
    if (procedure === null || procedure === "") {
        console.log("error");
        return null;
    }
    workspace.innerHTML = procedure;
    let iconsFrame = workspace.getElementsByClassName("dragging-icon-frame");
    for (let iconFrame of iconsFrame){
        let iconForClick = iconFrame.getElementsByClassName("dragging-icon")[0];
        iconMouseTracing(iconFrame,iconForClick,workspace);
    }
}
export default loadProcedure;