import actionOnClickingIcon from '../action/actionOnClickingSideAndCreateIconOnWorkspace';

async function iconOnSide(father) {
    let startContainer = document.createElement("div");
    let endContainer = document.createElement("div");
    let databaseContainer = document.createElement("div");
    let toolContainer = document.createElement("div");
    let processContainer = document.createElement("div");
    let dataValueContainer = document.createElement("div");

    let startIcon = document.createElement("div");
    let endIcon = document.createElement("div");
    let databaseICON = document.createElement("div");
    let toolICON = document.createElement("div");
    let processICON = document.createElement("div");
    let dataValue = document.createElement("div");

    let workspace = document.getElementById("dragging-frame-main");

    startContainer.classList.add("dragging-sideICON-container");
    startContainer.onclick = () => {
        actionOnClickingIcon(workspace,"start");
    };
    endContainer.classList.add("dragging-sideICON-container");
    endContainer.onclick = () => {
        actionOnClickingIcon(workspace,"end");
    };
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
    dataValueContainer.classList.add("dragging-sideICON-container");
    dataValueContainer.onclick = () => {
        actionOnClickingIcon(workspace,"datavalue");
    };

    databaseICON.classList.add("dragging-database");
    toolICON.classList.add("dragging-tool");
    processICON.classList.add("dragging-process");
    dataValue.classList.add("dragging-datavalue");
    startIcon.classList.add("dragging-start");
    endIcon.classList.add("dragging-end");

    startContainer.append(startIcon);
    endContainer.append(endIcon);
    databaseContainer.append(databaseICON);
    toolContainer.append(toolICON);
    processContainer.append(processICON);
    dataValueContainer.append(dataValue);

    father.append(startContainer);
    father.append(endContainer);
    father.append(databaseContainer);
    father.append(toolContainer);
    father.append(processContainer);
    father.append(dataValueContainer);

}

export default iconOnSide;