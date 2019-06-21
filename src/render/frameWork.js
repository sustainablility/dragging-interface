async function newWindow(targetElement) {
    let frame = document.createElement("div");
    let main = document.createElement("div");
    let toolsBar = document.createElement("div");
    let side = document.createElement("div");

    frame.id = "dragging-frame";
    main.id = "dragging-frame-main";
    side.id = "dragging-frame-side";
    toolsBar.id = "dragging-frame-toolsBar";

    frame.appendChild(side);
    frame.appendChild(main);
    frame.append(toolsBar);
    targetElement.appendChild(frame);
    return [side,main,toolsBar];
}

export default newWindow;