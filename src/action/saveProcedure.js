import saveProcedureToBackEnd from '../ajax/saveProcedure';
function saveProcedure(workspace) {
    saveProcedureToBackEnd("test","lji8wkbovlhjcbilimjgt",workspace.innerHTML);
}

export default saveProcedure;