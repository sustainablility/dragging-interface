import runProcedure from '../action/runTheProcedure';
async function toolsBar(father,workspace) {
    let saveButton = document.createElement("button");
    saveButton.innerText = "Run";
    saveButton.onclick = () => {
        runProcedure(workspace);
    };
    father.append(saveButton);
}

export default toolsBar;