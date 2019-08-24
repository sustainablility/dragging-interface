import {createConnectingPointsIn, createConnectingPointsOut} from "./renderPointsWhenSave";
import removeConnectingPoints from "../connectingLine/removeConnectingPoint";
import getDataViaAPI from '../../ajax/getDataViaAPI';

function manuForTool(locationX, locationY, element) {
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
        if (apiTest(man) !== null) {
            man.getElementsByClassName("dragging-rightClick-testButton")[0].innerHTML = "It works"
        }
    };
    testButton.innerText = "Test";
    row3.append(testButton);

    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };
}

function apiTest(manu) {
    let apiUrl = manu.getElementsByClassName("dragging-rightClick-input")[0];
    let apiInfo = getDataViaAPI(apiUrl.value);
    if (apiInfo !== null) {
        return apiInfo;
    }else {
        return null;
    }
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
    removeConnectingPoints(element);
    let apiInfo = apiTest(manu);
    if (apiInfo !== null) {
        let apiURL = manu.getElementsByClassName("dragging-rightClick-input")[0].value;
        element.setAttribute("_toolApi",apiURL);
        element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = apiInfo.name;
        console.log(apiInfo.parameter.length);
        console.log(apiInfo.output.length);
        let dataPointIN = createConnectingPointsIn(element, apiInfo.parameter.length);
        let dataPointOut = createConnectingPointsOut(element, apiInfo.output.length);

        element.setAttribute("_dataPointIn", JSON.stringify(dataPointIN));
        element.setAttribute("_dataPointOut", JSON.stringify(dataPointOut));
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

export default manuForTool;