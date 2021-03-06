import  size from '../lib/size';
import rightClickManuForDataObject from '../render/rightClickManu/manuForDataObject';
import rightClickManuForToolObject from '../render/rightClickManu/manuForToolObject';
import rightClickManuForProcedureObject from '../render/rightClickManu/manuForProcedureObject';
import rightClickManuForOutputObject from '../render/rightClickManu/manuForOutputObject';
import  renderLine from '../render/connectingLine/randerTheLine';
function mouseTracing(iconFrame,iconForClick, workspace) {
    iconForClick.onmousedown = (onmouseDownEvent) => {

        onmouseDownEvent.preventDefault();
        if (onmouseDownEvent.button === 2) {
            switch (iconFrame.getAttribute("_type")) {
                case "data":
                    rightClickManuForDataObject(size.pxConvertToRem(onmouseDownEvent.clientX), size.pxConvertToRem(onmouseDownEvent.clientY),iconFrame);
                    break;
                case "tool":
                    rightClickManuForToolObject(size.pxConvertToRem(onmouseDownEvent.clientX), size.pxConvertToRem(onmouseDownEvent.clientY),iconFrame);
                    break;
                case "procedure":
                    rightClickManuForProcedureObject(size.pxConvertToRem(onmouseDownEvent.clientX), size.pxConvertToRem(onmouseDownEvent.clientY),iconFrame);
                    break;
                case "output":
                    rightClickManuForOutputObject(size.pxConvertToRem(onmouseDownEvent.clientX), size.pxConvertToRem(onmouseDownEvent.clientY),iconFrame);
                    break;
            }
        }
        // diameter of connecting point
        let range = size.remConvertToPx(0.5);

        if (onmouseDownEvent.button === 0) {
            let distanceXFromCentralOfMouseToIconBorder = onmouseDownEvent.clientX - iconFrame.offsetLeft;
            let distanceYFromCentralOfMouseToIconBorder = onmouseDownEvent.clientY - iconFrame.offsetTop;

            document.onmousemove = (onmouseMoveEvent) => {
                iconFrame.style.top = size.pxConvertToRem(onmouseMoveEvent.clientY - distanceYFromCentralOfMouseToIconBorder) + "rem";
                iconFrame.style.left = size.pxConvertToRem(onmouseMoveEvent.clientX - distanceXFromCentralOfMouseToIconBorder) + "rem";
                let childPoints = iconFrame.childNodes;
                let workspacePosition =workspace.getBoundingClientRect();

                for (let point of childPoints) {
                    if (point.classList.contains('dragging-icon-connecting-point-position-out')) {
                        let line = document.querySelector("[_from='" + point.id + "']");
                        if (line !== null) {
                            let toPoint = document.getElementById(line.getAttribute("_to"));
                            let startPointPosition = point.getBoundingClientRect();
                            let toPointPosition = toPoint.getBoundingClientRect();
                            let startPointPositionX = startPointPosition.left - workspacePosition.left + range / 2;
                            let startPointPositionY = startPointPosition.top - workspacePosition.top + range / 2;
                            let toPointPositionX = toPointPosition.left - workspacePosition.left + range / 2;
                            let toPointPositionY = toPointPosition.top - workspacePosition.top + range / 2;
                            renderLine(line.id,startPointPositionX,startPointPositionY,toPointPositionX,toPointPositionY,workspace,point.id,toPoint.id);
                        }
                    }
                    if (point.classList.contains('dragging-icon-connecting-point-position-in')) {
                        let line = document.querySelector("[_to='" + point.id + "']");
                        if (line !== null) {
                            let startPoint = document.getElementById(line.getAttribute("_from"));
                            let startPointPosition = startPoint.getBoundingClientRect();
                            let toPointPosition = point.getBoundingClientRect();
                            let startPointPositionX = startPointPosition.left - workspacePosition.left + range / 2;
                            let startPointPositionY = startPointPosition.top - workspacePosition.top + range / 2;
                            let toPointPositionX = toPointPosition.left - workspacePosition.left + range / 2;
                            let toPointPositionY = toPointPosition.top - workspacePosition.top + range / 2;
                            renderLine(line.id,startPointPositionX,startPointPositionY,toPointPositionX,toPointPositionY,workspace,startPoint.id,point.id);
                        }
                    }
                }
            };

            document.onmouseup = (onmouseUpEvent) => {
                document.onmousemove = null;
            }
        }
    }
}
export default mouseTracing;