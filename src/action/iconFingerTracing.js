
function fingerTracing(icon) {
    icon.ontouchstart = (ontouchstartEvent) => {

        ontouchstartEvent.preventDefault();

        let distanceXFromCentralOfFingerToIconBorder = ontouchstartEvent.touches[0].clientX - icon.offsetLeft + (2*16);
        let distanceYFromCentralOfFingerToIconBorder = ontouchstartEvent.touches[0].clientY - icon.offsetTop + (2*16);

        document.ontouchmove = (ontouchmoveEvent) => {
            icon.style.top = (ontouchmoveEvent.touches[0].clientY - distanceYFromCentralOfFingerToIconBorder) + "px";
            icon.style.left = (ontouchmoveEvent.touches[0].clientX - distanceXFromCentralOfFingerToIconBorder) + "px";
        };

        document.ontouchend = (ontouchendEvent) => {
            document.ontouchmove = null;
        }
    }
}
export default fingerTracing;