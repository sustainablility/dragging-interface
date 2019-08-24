function initialCreate(iconType) {
    let iconFrame = document.createElement("div");
    iconFrame.classList.add("dragging-icon-frame");

    let iconInside = document.createElement("div");
    iconInside.classList.add("dragging-icon");

    let iconMainTitle = document.createElement("div");
    iconMainTitle.classList.add("dragging-icon-main-title");


    let iconSubTitle = document.createElement("div");
    iconSubTitle.classList.add("dragging-icon-sub-title");

    switch (iconType) {
        case "data":
            iconFrame.setAttribute("_type","data");
            iconMainTitle.innerText = "Data";
            break;
        case "tool":
            iconFrame.setAttribute("_type","tool");
            iconMainTitle.innerText = "Tool";
            break;
        case "procedure":
            iconFrame.setAttribute("_type","procedure");
            iconMainTitle.innerText = "Procedure";
            break;
    }
    iconInside.append(iconMainTitle);
    iconInside.append(iconSubTitle);
    iconFrame.append(iconInside);
    return [iconFrame,iconInside];
}

function reRender(icon) {

}

export {initialCreate, reRender};