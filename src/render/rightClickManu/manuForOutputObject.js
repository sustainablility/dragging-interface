import {createConnectingPointsIn, createConnectingPointsOut} from "./renderPointsWhenSave";
import removeConnectingPoints from "../connectingLine/removeConnectingPoint";
import getDataViaAPI from '../../ajax/getDataViaAPI';

function manuForOutput(locationX, locationY, element) {
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
        saveObject(man,element, useForSelector);
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

    let selectorOptionOutputAndStop = document.createElement("option");
    selectorOptionOutputAndStop.innerText = "Output Data and Stop";
    selectorOptionOutputAndStop.value = "odas";
    useForSelector.append(selectorOptionOutputAndStop);

    let selectorOptionOutputAndContinue = document.createElement("option");
    selectorOptionOutputAndContinue.innerText = "Output Data and Continue";
    selectorOptionOutputAndContinue.value = "odac";
    useForSelector.append(selectorOptionOutputAndContinue);



    row2.append(useForSelector);

    // End of row 2
    // ---------------------------------------------

    document.body.append(man);
    document.body.append(manuBg);
    manuBg.onclick = () => {
        removeManu(manuBg,man);
    };
}

function saveObject(manu, element, useForSelector) {
    switch (useForSelector.value) {
        case "odas":
            element.setAttribute("_usefor", "odas");
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Output and Stop";
            let points = createConnectingPointsIn(element, 1);
            element.setAttribute("_dataPoint",JSON.stringify(points));
            return null;
        case "odac":
            element.setAttribute("_usefor", "odac");
            element.getElementsByClassName("dragging-icon-sub-title")[0].innerText = "Output and Continue";
            let pointsIDIn = createConnectingPointsIn(element, 1);
            let pointsIDOut = createConnectingPointsOut(element, 1);
            element.setAttribute("_dataPointIn", JSON.stringify(pointsIDIn));
            element.setAttribute("_dataPointOut", JSON.stringify(pointsIDOut));
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

export default manuForOutput;