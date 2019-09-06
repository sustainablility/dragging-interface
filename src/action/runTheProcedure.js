import getDataViaAPI from '../ajax/getDataViaAPI';
import runToolByAPI from '../ajax/runToolByAPI';
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
                    let url = element.getAttribute("_dataapi");
                    let dataFromAPI = getDataViaAPI(url);
                    if (destPoint !== null) {
                        destPoint.setAttribute("_result", JSON.stringify(dataFromAPI));
                    }
                    if (!que.includes(destElement)) {
                        que.push(destElement);
                    }
                }
                break;
            case "tool":
                let pointInIDList = JSON.parse(element.getAttribute("_datapointin"));
                let pointInDataList = [];
                for (let pointID of pointInIDList) {
                    let point = document.getElementById(pointID);
                    let dataFromPoint = JSON.parse(point.getAttribute("_result"));
                    pointInDataList.push(dataFromPoint);
                }
                let result = runToolByAPI(element.getAttribute("_toolapi"), pointInDataList);
                if(result == null) {
                    console.log("Tool Error");
                    break;
                }
                let connectingElements = getConnectingElements(workspace,element);
                for (let i = 0; i < result.length; i ++) {
                    connectingElements[i][0].setAttribute("_result",JSON.stringify(result[i]));
                    if (!que.includes(connectingElements[i])) {
                        que.push(connectingElements[i][1]);
                    }
                }
                break;
            case "output":
                if (element.getAttribute("_usefor") === "odas") {
                    let dataInElement = element.getElementsByClassName("dragging-icon-connecting-point-position-in")[0];
                    console.log(dataInElement.getAttribute("_result"));
                    break;
                }else if (element.getAttribute("_usefor") === "odac"){
                    let dataInElement = element.getElementsByClassName("dragging-icon-connecting-point-position-in")[0];
                    console.log(dataInElement.getAttribute("_result"));
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