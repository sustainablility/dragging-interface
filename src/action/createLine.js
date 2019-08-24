import idGenerator from '../lib/randomIDGenerator';
import lineRander from '../render/connectingLine/randerTheLine';
import size from '../lib/size';
function createLine(workspaceObject,pointObject) {
    pointObject.onmousedown = (onMouseDownEvent) => {
        onMouseDownEvent.preventDefault();

        // diameter of connecting point
        let range = size.remConvertToPx(0.5);

        // Initial point position
        let pointPosition = pointObject.getBoundingClientRect();
        let workspacePosition = workspaceObject.getBoundingClientRect();
        let initialXPosition = pointPosition.left - workspacePosition.left + range / 2;
        let initialYPosition = pointPosition.top - workspacePosition.top + range / 2;

        // Line ID
        let lineID = idGenerator();


        // Initial render
        lineRander(lineID,initialXPosition,initialYPosition,initialXPosition, initialYPosition,workspaceObject, pointObject.id);

        // Initial mouse position
        let mousePositionX;
        let mousePositionY;


        document.onmousemove = (onMouseMoveEvent) => {

            // render line while mouse is moving
            mousePositionX = onMouseMoveEvent.clientX - workspacePosition.left;
            mousePositionY = onMouseMoveEvent.clientY - workspacePosition.top;
            lineRander(lineID,initialXPosition,initialYPosition,mousePositionX, mousePositionY,workspaceObject, pointObject.id);
        };


        document.onmouseup = (onMouseUpEvent) => {

            // get all the connecting point in workspace
            let pointsOnWorkSpace = document.getElementsByClassName("dragging-icon-connecting-point");

            let flagOfDestinationExisted = false;

            // Loop through all the points
            for (let point of pointsOnWorkSpace) {
                let pointRelativeToScreen = point.getBoundingClientRect();
                let mousePositionXRelatedToScreen = onMouseUpEvent.clientX;
                let mousePositionYRelatedToScreen = onMouseUpEvent.clientY;

                // Check if mouse is in the point, if two points are not duplicated
                if (
                    mousePositionXRelatedToScreen > pointRelativeToScreen.left &&
                    mousePositionXRelatedToScreen < pointRelativeToScreen.left + range &&
                    mousePositionYRelatedToScreen > pointRelativeToScreen.top &&
                    mousePositionYRelatedToScreen < pointRelativeToScreen.top + range &&
                    pointObject.id !== point.id &&
                    pointObject.parentNode.id !== point.parentNode.id
                ) {
                    flagOfDestinationExisted = true;
                    let destinationPointPosition = point.getBoundingClientRect();
                    let destinationPointPositionX = destinationPointPosition.left - workspacePosition.left + range / 2;
                    let destinationPointPositionY = destinationPointPosition.top - workspacePosition.top + range / 2;
                    lineRander(lineID,initialXPosition,initialYPosition,destinationPointPositionX, destinationPointPositionY,workspaceObject, pointObject.id,point.id);
                    break;
                }
            }

            // If mouse is not in any of the point, remove the line
            if (!flagOfDestinationExisted) {
                workspaceObject.removeChild(document.getElementById(lineID));
            }

            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}

export default createLine;