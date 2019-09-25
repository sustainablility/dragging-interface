import runProcedure from '../action/runTheProcedure';
import saveProcedure from "../action/saveProcedure";
import loadProcedure from "../action/loadFromLocal";
async function toolsBar(father,workspace) {
    let runButton = document.createElement("button");
    runButton.innerText = "Run";
    runButton.onclick = () => {
        runProcedure(workspace);
    };
    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = () => {
        saveProcedure(workspace);
    };
    let loadButton = document.createElement("button");
    loadButton.innerText = "Load";
    loadButton.onclick = () => {
        loadProcedure(workspace);
    };
    father.append(runButton);
    father.append(saveButton);
    father.append(loadButton);
}

export default toolsBar;