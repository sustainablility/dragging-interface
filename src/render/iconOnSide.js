import actionOnClickingIcon from '../action/actionOnClickingSideAndCreateIconOnWorkspace';

async function iconOnSide(father) {
    let databaseContainer = document.createElement("div");
    let toolContainer = document.createElement("div");
    let processContainer = document.createElement("div");

    let databaseICON = document.createElement("div");
    let toolICON = document.createElement("div");
    let processICON = document.createElement("div");

    let workspace = document.getElementById("dragging-frame-main");

    databaseContainer.classList.add("dragging-sideICON-container");
    databaseContainer.onclick = () => {
        actionOnClickingIcon(workspace,"database");
    };
    toolContainer.classList.add("dragging-sideICON-container");
    toolContainer.onclick = () => {
        actionOnClickingIcon(workspace,"tool");
    };
    processContainer.classList.add("dragging-sideICON-container");
    processContainer.onclick = () => {
        actionOnClickingIcon(workspace,"process");
    };

    databaseICON.classList.add("dragging-database");
    toolICON.classList.add("dragging-tool");
    processICON.classList.add("dragging-process");

    databaseContainer.append(databaseICON);
    toolContainer.append(toolICON);
    processContainer.append(processICON);

    father.append(databaseContainer);
    father.append(toolContainer);
    father.append(processContainer);

}

export default iconOnSide;