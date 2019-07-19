function renderManu(locationX, locationY, element) {
    let man = document.createElement("div");
    let manuBg = document.createElement("div");
    man.classList.add("dragging-icon-rightClick-manu");
    manuBg.classList.add("dragging-icon-rightClick-manu-bg");
    man.style.left = locationX + "em";
    man.style.top = locationY + "em";

    // Render delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("dragging-rightClick-deleteButton");
    deleteButton.onclick = () => {
        deleteElement(element);
        removeManu(manuBg,man);
    };
    deleteButton.innerText = "Delete";
    man.append(deleteButton);

    man.append(document.createElement("hr"));

    let dataInputFrame = document.createElement("div");
    dataInputFrame.classList.add("dragging-rightClick-inputFrame");
    let dataInputArea = document.createElement("input");
    dataInputArea.type = "text";
    let previousData = element.getAttribute("_data");
    if (previousData !== null) {
        dataInputArea.value = previousData;
    }
    dataInputArea.classList.add("dragging-rightClick-input");
    let dataInputSubmit = document.createElement("button");
    dataInputSubmit.innerText = "Enter";
    dataInputSubmit.onclick = () => {
        element.setAttribute("_data",dataInputArea.value);
        removeManu(manuBg,man);
    };
    dataInputFrame.append(dataInputArea);
    dataInputFrame.append(dataInputSubmit);
    man.append(dataInputFrame);


    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };

}

function removeManu(manuBg,man) {
    document.body.removeChild(manuBg);
    document.body.removeChild(man);
}

function deleteElement(element) {
    console.log(element.id);
    let points = element.childNodes;
    let workspace = document.getElementById("dragging-frame-main");
    for (let point of points) {
        if (point.classList.contains('dragging-icon-connecting-point-position-in')){
            let line =  document.querySelector("[_to='" + point.id + "']");
            if (line !== null) {
                workspace.removeChild(line);
            }
        }
        if (point.classList.contains('dragging-icon-connecting-point-position-out')) {
            let line = document.querySelector("[_from='" + point.id + "']");
            if (line !== null) {
                workspace.removeChild(line);
            }
        }
    }
    workspace.removeChild(element);
}

export default renderManu;