import getDataViaAPI from '../ajax/getDataViaAPI';
import {cacheAPIGetData} from '../config';
import runToolByAPI from '../ajax/runToolByAPI';
import putDataToCache from '../ajax/cache/putDataToCache';
import outputProcedureResult from "./outputProcedureResult";
async function runTheProcedure(workspace) {

    let que = [];

    let startPoints1 = workspace.querySelectorAll("[_type='data'][_datatype='api']");
    for (let i of startPoints1) {
        que.push(i);
    }
    let startPoints2 = workspace.querySelectorAll("[_type='data'][_datatype='custom']");
    for (let i of startPoints2) {
        que.push(i);
    }
    putLineNumberToTools(workspace);


    while (que.length > 0) {
        let element = que.shift();
        switch (element.getAttribute("_type")) {
            case "data":
                if (element.getAttribute("_datatype") === "output") {
                    let dataInID = JSON.parse(element.getAttribute("_datapoint"))[0];
                    let dataInElement = document.getElementById(dataInID);
                    console.log(dataInElement.getAttribute("_result"));
                }else {
                    let dest = getConnectingElement(workspace, element);
                    let destPoint = dest[0];
                    let destElement = dest[1];
                    let dataType = element.getAttribute("_datatype");
                    let url = element.getAttribute("_dataapi");
                    if (dataType === "api") {
                        destPoint.setAttribute("_result", url);
                    }else if (dataType === "custom"){
                        let dataText = element.getAttribute("_datatext");
                        let dataID = putDataToCache(JSON.parse(dataText));
                        destPoint.setAttribute("_result", cacheAPIGetData + "?" + dataID);
                    }
                    if (!que.includes(destElement)) {
                        if (destElement.getAttribute("_type") === "tool") {
                            let lineNumberLeft = Number(destElement.getAttribute("_line_in_number_left"));
                            if (lineNumberLeft <= 1) {
                                que.push(destElement);
                            } else {
                                lineNumberLeft --;
                                destElement.setAttribute("_line_in_number_left", String(lineNumberLeft));
                            }
                        } else {
                            que.push(destElement);
                        }
                    }
                }
                console.log("Done Data");
                break;
            case "tool":
                let pointInIDList = JSON.parse(element.getAttribute("_datapointin"));
                let pointInDataList = [];
                pointInDataList.push(element.getAttribute("_method"));
                for (let pointID of pointInIDList) {
                    let point = document.getElementById(pointID);
                    let urlFromPoint = point.getAttribute("_result");
                    pointInDataList.push(urlFromPoint);
                }
                let result = await runToolByAPI(element.getAttribute("_toolapi"), pointInDataList).catch(err => {
                    console.log(err);
                });
                if(result === undefined) {
                    console.log("Tool Error");
                    break;
                }

                let connectingElements = getConnectingElements(workspace,element);

                for (let i = 0; i < result.length; i ++) {
                    connectingElements[i][0].setAttribute("_result",result[i]);
                    if (!que.includes(connectingElements[i])) {
                        que.push(connectingElements[i][1]);
                    }
                }
                console.log("Done Tool");
                break;
            case "output":
                if (element.getAttribute("_usefor") === "odas") {
                    let dataInElement = element.getElementsByClassName("dragging-icon-connecting-point-position-in")[0];
                    outputProcedureResult(dataInElement.getAttribute("_result"));
                    break;
                }else if (element.getAttribute("_usefor") === "odac"){
                    let dataInElement = element.getElementsByClassName("dragging-icon-connecting-point-position-in")[0];
                    outputProcedureResult(dataInElement.getAttribute("_result"));
                    let dest = getConnectingElements(workspace, element)[0];
                    let destPoint = dest[0];
                    let destElement = dest[1];
                    if (destPoint !== null) {
                        destPoint.setAttribute("_result", dataInElement.getAttribute("_result"));
                    }
                    if (!que.includes(destElement)) {
                        que.push(destElement);
                    }
                }
        }
    }

}

function putLineNumberToTools(workspace) {
    let tools = workspace.querySelectorAll("[_type='tool']");
    for (let tool of tools) {
        let num = 0;
        let dataPointIns = JSON.parse(tool.getAttribute("_datapointin"));
        for (let dataPointIn of dataPointIns) {
            if (workspace.querySelector("[_to='" + dataPointIn + "']") !== null) {
                num ++;
            }
        }
        tool.setAttribute("_line_in_number_left",String(num));
    }
}

function getConnectingElement(workspace, element) {
    let dataPointIDs = JSON.parse(element.getAttribute("_datapoint"));
    if (dataPointIDs !== null) {
        let line = workspace.querySelector("[_from='" + dataPointIDs[0] + "']");
        let destPoint = document.getElementById(line.getAttribute("_to"));
        let destElement = destPoint.parentNode;
        return [destPoint, destElement];
    }
    return null;
}

function getConnectingElements(workspace, element) {
    let dataPointIDs = JSON.parse(element.getAttribute("_datapointout"));
    if (dataPointIDs !== null) {
        let lines = workspace.querySelectorAll("[_from='" + dataPointIDs[0] + "']");
        let returnList = [];
        for (let line of lines) {
            let destPoint = document.getElementById(line.getAttribute("_to"));
            let destElement = destPoint.parentNode;
            returnList.push([destPoint, destElement])
        }
        return returnList;
    }
    return null;
}

export default runTheProcedure;