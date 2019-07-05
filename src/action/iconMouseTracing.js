import  size from '../lib/size';
import  renderLine from '../render/connectingLine/randerTheLine';
function mouseTracing(iconFrame,iconForClick, workspace) {
    iconForClick.onmousedown = (onmouseDownEvent) => {

        onmouseDownEvent.preventDefault();

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
                        let startPointPositionX = startPointPosition.left - workspacePosition.left;
                        let startPointPositionY = startPointPosition.top - workspacePosition.top;
                        let toPointPositionX = toPointPosition.left - workspacePosition.left;
                        let toPointPositionY = toPointPosition.top - workspacePosition.top;
                        renderLine(line.id,startPointPositionX,startPointPositionY,toPointPositionX,toPointPositionY,workspace,point.id,toPoint.id);
                    }
                }
                if (point.classList.contains('dragging-icon-connecting-point-position-in')) {
                    let line = document.querySelector("[_to='" + point.id + "']");
                    if (line !== null) {
                        let startPoint = document.getElementById(line.getAttribute("_from"));
                        let startPointPosition = startPoint.getBoundingClientRect();
                        let toPointPosition = point.getBoundingClientRect();
                        let startPointPositionX = startPointPosition.left - workspacePosition.left;
                        let startPointPositionY = startPointPosition.top - workspacePosition.top;
                        let toPointPositionX = toPointPosition.left - workspacePosition.left;
                        let toPointPositionY = toPointPosition.top - workspacePosition.top;
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
export default mouseTracing;