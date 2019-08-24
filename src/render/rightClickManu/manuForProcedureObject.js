function manuForProcedure(locationX, locationY, element) {
    let man = document.createElement("div");
    let manuBg = document.createElement("div");
    man.classList.add("dragging-icon-rightClick-manu");
    manuBg.classList.add("dragging-icon-rightClick-manu-bg");
    man.style.left = locationX + "em";
    man.style.top = locationY + "em";

    // Render row 1

    // -------------------------------------------------------

    let row1 = document.createElement("div");
    row1.classList.add("dragging-icon-rightClick-manu-row");
    man.append(row1);

    // Render delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("dragging-rightClick-deleteButton");
    deleteButton.onclick = () => {
        deleteElement(element);
        removeManu(manuBg,man);
    };
    deleteButton.innerText = "Delete";
    row1.append(deleteButton);


    // Render save button
    let saveButton = document.createElement("button");
    saveButton.classList.add("dragging-rightClick-deleteButton");
    saveButton.onclick = () => {
        saveObject(man,element);
        removeManu(manuBg,man);
    };
    saveButton.innerText = "Save";
    row1.append(saveButton);

    // End of Row 1
    // ----------------------------------------------------------

    // Render Row 2
    renderAPIInputBox(man);

    // Render Row 3

    let row3 = document.createElement("div");
    row3.classList.add("dragging-icon-rightClick-manu-row");
    man.append(row3);

    // Render Test button
    let testButton = document.createElement("button");
    testButton.classList.add("dragging-rightClick-testButton");
    testButton.onclick = () => {
    };
    testButton.innerText = "Test";
    row3.append(testButton);

    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };
}

function renderAPIInputBox(manu) {
    let anotherRow = document.createElement("div");
    anotherRow.id = "dragging-annotherRow";
    anotherRow.classList.add("dragging-icon-rightClick-manu-row");

    let apiWord = document.createElement("div");
    apiWord.classList.add("dragging-rightClick-text");
    apiWord.innerText = "API";
    anotherRow.append(apiWord);

    let apiInput = document.createElement("input");
    apiInput.classList.add("dragging-rightClick-input");
    apiInput.type = "text";

    anotherRow.append(apiInput);
    manu.append(anotherRow);
}

function renderCustomizedDataBox(manu) {
    let anotherRow = document.createElement("div");
    anotherRow.id = "dragging-annotherRow";
    anotherRow.classList.add("dragging-icon-rightClick-manu-row");

    let word = document.createElement("div");
    word.classList.add("dragging-rightClick-text");
    word.innerText = "Data";
    anotherRow.append(word);

    let textarea = document.createElement("textarea");
    textarea.classList.add("dragging-rightClick-textarea");

    anotherRow.append(textarea);
    manu.append(anotherRow);
}

function saveObject(manu, element) {
    let tempDataType = element.getAttribute("_dataType_temp");
    if (tempDataType === null || tempDataType === "") {
        return null;
    }
    element.setAttribute("_dataType",tempDataType);

    switch (tempDataType) {
        case "api":
            let apiURL = document.getElementsByClassName("dragging-rightClick-input")[0].value;
            if (apiURL !== null) {
                element.setAttribute("_dataAPI",apiURL);
            }
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "API";
            return null;
        case "output":
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Output";
            return null;
        case "custom":
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Custom";
            let customText = document.getElementsByClassName("dragging-rightClick-textarea")[0].value;
            if (customText !== null) {
                element.setAttribute("_dataText",customText);
            }
            return null;
    }
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

export default manuForProcedure;