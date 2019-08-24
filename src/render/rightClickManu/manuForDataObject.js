import {createConnectingPointsIn, createConnectingPointsOut} from "./renderPointsWhenSave";
import removeConnectingPoints from "../connectingLine/removeConnectingPoint";
import getDataViaAPI from '../../ajax/getDataViaAPI';

function manuForData(locationX, locationY, element) {
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
        removeConnectingPoints(element);
        saveObject(man,element);
        removeManu(manuBg,man);
    };
    saveButton.innerText = "Save";
    row1.append(saveButton);

    // End of Row 1
    // ----------------------------------------------------------

    // Render Row 2

    // ---------------------------------------------------------

    let row2 = document.createElement("div");
    row2.classList.add("dragging-icon-rightClick-manu-row");
    man.append(row2);

    // Render Text "Use For"

    let useFor = document.createElement("div");
    useFor.classList.add("dragging-rightClick-text");
    useFor.innerText = "Use For";
    row2.append(useFor);

    let useForSelector = document.createElement("select");

    let defaultOption = document.createElement("option");
    defaultOption.innerText = "Select One";
    defaultOption.value = "";
    useForSelector.append(defaultOption);

    let selectorOptionOutputData = document.createElement("option");
    selectorOptionOutputData.innerText = "Output Data";
    selectorOptionOutputData.value = "output";
    useForSelector.append(selectorOptionOutputData);

    let selectorOptionAPI = document.createElement("option");
    selectorOptionAPI.innerText = "Data From API";
    selectorOptionAPI.value = "api";
    useForSelector.append(selectorOptionAPI);

    let selectorOptionCustom = document.createElement("option");
    selectorOptionCustom.innerText = "Custom Data";
    selectorOptionCustom.value = "custom";
    useForSelector.append(selectorOptionCustom);


    row2.append(useForSelector);

    // End of row 2
    // ---------------------------------------------

    useForSelector.onchange = () => {
        let anotherRow = document.getElementById("dragging-annotherRow");
        if (anotherRow !== null) {
            man.removeChild(anotherRow);
        }
        if (useForSelector.value === 'api') {
            element.setAttribute("_dataType_temp","api");
            renderAPIInputBox(man,element);
        } else
        if (useForSelector.value === 'output') {
            element.setAttribute("_dataType_temp","output");
        } else
        if (useForSelector.value === 'custom') {
            element.setAttribute("_dataType_temp","custom");
            renderCustomizedDataBox(man,element);
        }
    };

    switch (element.getAttribute("_dataType")) {
        case "api":
            renderAPIInputBox(man,element);
            break;
        case "custom":
            renderCustomizedDataBox(man, element);
            break;
    }

    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };
}

function renderAPIInputBox(manu, element) {
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

    let previousAPI = element.getAttribute("_dataAPI");
    if (previousAPI !== null) {
        apiInput.value = previousAPI;
    }

    anotherRow.append(apiInput);
    manu.append(anotherRow);
}

function renderCustomizedDataBox(manu,element) {

    let anotherRow = document.createElement("div");
    anotherRow.id = "dragging-annotherRow";
    anotherRow.classList.add("dragging-icon-rightClick-manu-row");

    let word = document.createElement("div");
    word.classList.add("dragging-rightClick-text");
    word.innerText = "Data";
    anotherRow.append(word);

    let textarea = document.createElement("textarea");
    textarea.classList.add("dragging-rightClick-textarea");

    let previousData = element.getAttribute("_dataText");
    if (previousData !== null) {
        textarea.value = previousData;
    }

    anotherRow.append(textarea);
    manu.append(anotherRow);
}

function saveObject(manu, element) {
    let tempDataType = element.getAttribute("_dataType_temp");
    if (tempDataType === null || tempDataType === "") {
        return null;
    }
    element.setAttribute("_dataType",tempDataType);
    let pointID;
    switch (tempDataType) {
        case "api":
            let apiInputBox = manu.getElementsByClassName("dragging-rightClick-input")[0];
            let apiData = getDataViaAPI(apiInputBox.value);
            if (apiData !== null) {
                let apiURL = document.getElementsByClassName("dragging-rightClick-input")[0].value;
                if (apiURL !== null) {
                    element.setAttribute("_dataAPI",apiURL);
                }
                element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "API";
                pointID = createConnectingPointsOut(element, 1);
                element.setAttribute("_dataPoint",JSON.stringify(pointID));
            }
            return null;
        case "output":
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Output";
            pointID = createConnectingPointsIn(element, 1);
            element.setAttribute("_dataPoint",JSON.stringify(pointID));
            return null;
        case "custom":
            let dataInputBox = manu.getElementsByClassName("dragging-rightClick-textarea")[0];
            if (dataInputBox.value !== null) {
                element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Custom";
                element.setAttribute("_dataText",dataInputBox.value);
                pointID = createConnectingPointsOut(element, 1);
                element.setAttribute("_dataPoint",JSON.stringify(pointID));
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

export default manuForData;