import getDataViaAPI from '../ajax/getDataViaAPI';
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
        let element = que.pop();
        switch (element.getAttribute("_type")) {
            case "data":
                if (element.getAttribute("_datatype") === "output") {
                    console.log(element.getAttribute("_result"));
                }else {
                    let destPoint = getConnectingElement(workspace, element);
                    let url = element.getAttribute("_dataapi");
                    let dataFromAPI = getDataViaAPI(url);
                    if (destPoint !== null) {
                        if (destPoint) 
                        destPoint.setAttribute("_result", JSON.stringify(dataFromAPI));
                    }
                    que.push(destPoint)
                }
                break;
            case "tool":

        }
    }

}

function getConnectingElement(workspace, element) {
    let dataPointIDs = JSON.parse(element.getAttribute("_datapoint"));
    if (dataPointIDs !== null) {
        let line = workspace.querySelector("[_from='" + dataPointIDs[0] + "']");
        let destPoint = workspace.getElementById(line.getAttribute("_to"));
        let destElement = destPoint.parentNode;
        return destElement;
    }
    return null;
}

function getConnectingElements(workspace, element) {
    let dataPointIDs = JSON.parse(element.getAttribute("_datapoint"));
    let elements
    if (dataPointIDs !== null) {
        let lines = workspace.querySelectorAll("[_from='" + dataPointIDs[0] + "']");
        for (let line of lines) {

        }
        let destPoint = workspace.getElementById(line.getAttribute("_to"));
        let destElement = destPoint.parentNode;
        return destElement;
    }
    return null;
}

export default runTheProcedure;