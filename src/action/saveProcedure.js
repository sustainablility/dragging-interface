import saveProcedureToBackEnd from '../ajax/saveProcedure';
function saveProcedure(workspace) {
    saveProcedureToBackEnd(window.draggingInterface.procedureName,window.draggingInterface.userToken,workspace.innerHTML);
}

export default saveProcedure;