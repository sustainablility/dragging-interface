
function mouseTracing(icon) {
    icon.onmousedown = (onmouseDownEvent) => {

        onmouseDownEvent.preventDefault();

        let distanceXFromCentralOfMouseToIconBorder = onmouseDownEvent.clientX - icon.offsetLeft + (2*16);
        let distanceYFromCentralOfMouseToIconBorder = onmouseDownEvent.clientY - icon.offsetTop + (2*16);

        document.onmousemove = (onmouseMoveEvent) => {
            icon.style.top = (onmouseMoveEvent.clientY - distanceYFromCentralOfMouseToIconBorder) + "px";
            icon.style.left = (onmouseMoveEvent.clientX - distanceXFromCentralOfMouseToIconBorder) + "px";
        };

        document.onmouseup = (onmouseUpEvent) => {
            document.onmousemove = null;
        }
    }
}
export default mouseTracing;