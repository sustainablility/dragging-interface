import size from "../../lib/size";
import abs from '../../lib/getAbsValue'
function renderLine(lineID, positionAX, positionAY, positionBX, positionBY,workspace, from = null, to = null) {
    let lineSet = document.getElementById(lineID);
    if (lineSet === null) {
        lineSet = document.createElement("div");
        lineSet.classList.add("dragging-lineSet");
        lineSet.id = lineID;
        workspace.append(lineSet);
    }
    lineSet.setAttribute("_from",from);
    lineSet.setAttribute("_to",to);
    lineSet.innerHTML = "";
    
    // Calculating the quadrant

    let xVector = positionBX - positionAX;
    let yVector = positionBY - positionAY;
    let gapAjust = 0.7;

    lineSet.style.height = abs(size.pxConvertToRem(yVector))  + "rem";
    lineSet.style.width = abs(size.pxConvertToRem(xVector)) + "rem";

    if (xVector >= 0 && yVector <= 0) {
        // The first quadrant
        lineSet.style.top = size.pxConvertToRem(positionAY + yVector) + "rem";
        lineSet.style.left = size.pxConvertToRem(positionAX) + "rem";

        makeVerticalLine(lineSet, 0, size.pxConvertToRem(abs(yVector)), gapAjust);
        makeHorizontalLine(lineSet, 0, size.pxConvertToRem(abs(yVector)) + gapAjust, size.pxConvertToRem(xVector / 2));
        makeVerticalLine(lineSet, size.pxConvertToRem(xVector / 2), -gapAjust, size.pxConvertToRem(abs(yVector)) + (gapAjust * 2));
        makeHorizontalLine(lineSet, size.pxConvertToRem(xVector / 2), -gapAjust, size.pxConvertToRem(xVector/2));
        makeVerticalLine(lineSet, size.pxConvertToRem(xVector), -gapAjust, gapAjust);
    }  else

    if (xVector >= 0 && yVector >= 0) {
        // The second quadrant
        lineSet.style.top = size.pxConvertToRem(positionAY) + "rem";
        lineSet.style.left = size.pxConvertToRem(positionAX) + "rem";
        makeVerticalLine(lineSet, 0,0, size.pxConvertToRem(yVector / 2));
        makeHorizontalLine(lineSet,0,size.pxConvertToRem(yVector / 2),size.pxConvertToRem(xVector));
        makeVerticalLine(lineSet,size.pxConvertToRem(xVector),size.pxConvertToRem(yVector / 2),size.pxConvertToRem(yVector / 2));
    }  else

    if (xVector <= 0 && yVector >= 0) {
        // The third quadrant

        lineSet.style.top = size.pxConvertToRem(positionAY) + "rem";
        lineSet.style.left = size.pxConvertToRem(positionAX + xVector) + "rem";

        makeVerticalLine(lineSet, size.pxConvertToRem(abs(xVector)),0, size.pxConvertToRem(yVector / 2));
        makeHorizontalLine(lineSet,0,size.pxConvertToRem(yVector / 2),size.pxConvertToRem(abs(xVector)));
        makeVerticalLine(lineSet,0,size.pxConvertToRem(yVector / 2),size.pxConvertToRem(yVector / 2));
    }

    else {
        // The last quadrant

        lineSet.style.top = size.pxConvertToRem(positionAY + yVector) + "rem";
        lineSet.style.left = size.pxConvertToRem(positionAX + xVector) + "rem";

        makeVerticalLine(lineSet, size.pxConvertToRem(abs(xVector)), size.pxConvertToRem(abs(yVector)), gapAjust);
        makeHorizontalLine(lineSet, size.pxConvertToRem(abs(xVector)) / 2, size.pxConvertToRem(abs(yVector)) + gapAjust, size.pxConvertToRem(abs(xVector) / 2));
        makeVerticalLine(lineSet, size.pxConvertToRem(abs(xVector) / 2), -gapAjust, size.pxConvertToRem(abs(yVector)) + (gapAjust * 2));
        makeHorizontalLine(lineSet, 0, -gapAjust, size.pxConvertToRem(abs(xVector)/2));
        makeVerticalLine(lineSet, 0, -gapAjust, gapAjust);
    }



}

function makeHorizontalLine(parent, locationX, locationY, length) {
    let horizontalLine = document.createElement("div");
    horizontalLine.classList.add("dragging-line-horizontal");
    horizontalLine.style.width = length + "rem";
    horizontalLine.style.left = locationX + "rem";
    horizontalLine.style.top = locationY + "rem";
    parent.append(horizontalLine);
}
function makeVerticalLine(parent, locationX, locationY, length) {
    let verticalLine = document.createElement("div");
    verticalLine.classList.add("dragging-line-vertical");
    verticalLine.style.height = length + "rem";
    verticalLine.style.left = locationX + "rem";
    verticalLine.style.top = locationY + "rem";
    parent.append(verticalLine);
}

export  default  renderLine;