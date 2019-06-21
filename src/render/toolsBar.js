import saveAsHTMLAction from '../action/saveAsHTML';
async function toolsBar(father,workspace) {
    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = () => {
        saveAsHTMLAction(workspace);
    };
    father.append(saveButton);
}

export default toolsBar;