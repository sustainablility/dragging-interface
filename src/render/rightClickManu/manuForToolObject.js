import {createConnectingPointsIn, createConnectingPointsOut} from "./renderPointsWhenSave";
import removeConnectingPoints from "../connectingLine/removeConnectingPoint";
import getDataViaAPI from '../../ajax/getDataViaAPI';

async function manuForTool(locationX, locationY, element) {
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
    renderAPIInputBox(man, element);

    // Render Row 3

    let row3 = document.createElement("div");
    row3.classList.add("dragging-icon-rightClick-manu-row");
    man.append(row3);

    // Render Test button
    let checkButton = document.createElement("button");
    checkButton.classList.add("dragging-rightClick-testButton");
    checkButton.onclick = () => {
        checkButtonAction(man,element)
    };
    checkButton.innerText = "Check";
    row3.append(checkButton);
    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };
}

async function apiTest(manu) {
    let apiUrl = manu.getElementsByClassName("dragging-rightClick-input")[0];
    let apiInfo = await getDataViaAPI(apiUrl.value).catch((err) => {
        console.log(err);
    });
    if (apiInfo !== undefined) {
        return apiInfo;
    }else {
        return null;
    }
}

async function checkButtonAction(manu, element) {
    let apiInfo = await apiTest(manu);
    if (apiInfo !== null) {
        manu.getElementsByClassName("dragging-rightClick-testButton")[0].innerHTML = "It works";
        await renderMethodSelection(manu, apiInfo.methods, element);
    }
}

async function renderMethodSelection(manu, methodList, element) {
    let row = document.createElement("div");
    row.classList.add("dragging-icon-rightClick-manu-row");
    manu.append(row);

    let MethodText = document.createElement("div");
    MethodText.classList.add("dragging-rightClick-text");
    MethodText.innerText = "Method";
    row.append(MethodText);

    let methodSelect = document.createElement("select");

    let defaultOption = document.createElement("option");
    defaultOption.innerText = "Select a Method";
    defaultOption.value = "";
    methodSelect.append(defaultOption);
    for (let method of methodList) {
        let methodOption = document.createElement("option");
        if (element.getAttribute("_method") !== undefined) {
            if (element.getAttribute("_method") === method.name) {
                methodOption.selected = true;
            }
        }
        methodOption.innerText = method.name;
        methodOption.value = method.name;
        methodSelect.append(methodOption);
    }

    methodSelect.onchange = () => {
        element.setAttribute("_method", methodSelect.value);
    };

    row.append(methodSelect);
    manu.append(row);
}

async function renderAPIInputBox(manu, element) {
    let anotherRow = document.createElement("div");
    anotherRow.id = "dragging-annotherRow";
    anotherRow.classList.add("dragging-icon-rightClick-manu-row");

    let apiWord = document.createElement("div");
    apiWord.classList.add("dragging-rightClick-text");
    apiWord.innerText = "API";
    anotherRow.append(apiWord);

    let apiInput = document.createElement("input");
    apiInput.classList.add("dragging-rightClick-input");
    if (element.getAttribute("_toolApi") !== undefined) {
        apiInput.value = element.getAttribute("_toolApi");
    }
    apiInput.type = "text";

    anotherRow.append(apiInput);
    manu.append(anotherRow);
}


async function saveObject(manu, element) {
    removeConnectingPoints(element);
    let apiInfo = await apiTest(manu);
    let dataPointIN;
    let dataPointOut;
    if (apiInfo !== null) {
        let apiURL = manu.getElementsByClassName("dragging-rightClick-input")[0].value;
        element.setAttribute("_toolApi",apiURL);
        element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = apiInfo.name;
        let methodName = element.getAttribute("_method");
        for (let method of apiInfo.methods) {
            if (method.name === methodName) {
                dataPointIN = createConnectingPointsIn(element, method.parameter.length);
                dataPointOut = createConnectingPointsOut(element, method.output.length);
                break;
            }
        }

        element.setAttribute("_dataPointIn", JSON.stringify(dataPointIN));
        element.setAttribute("_dataPointOut", JSON.stringify(dataPointOut));
    }
}

async function removeManu(manuBg,man) {
    document.body.removeChild(manuBg);
    document.body.removeChild(man);
}

async function deleteElement(element) {
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