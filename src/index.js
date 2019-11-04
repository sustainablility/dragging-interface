import frameRender from './render/frameWork'; // render frame

import iconsRender from './render/iconOnSide'; // render icons
import loadProcedure from "./action/getProcedure";
import toolsBarRender from './render/toolsBar';

import './style/index.scss';

async function handler(basicElementSelector, procedureContent, procedureName) {
    let basicElement = document.querySelector(basicElementSelector);
    if (basicElement === undefined || basicElement === null) {
        throw new Error("element does not existed");
    }

    let [frameSide,frameMain,frameToolsBar] = await frameRender(basicElement);
    await iconsRender(frameSide);
    await toolsBarRender(frameToolsBar,frameMain);
    loadProcedure(frameMain, procedureContent);
    document.oncontextmenu = () => {
        return false;
    };
}

window.dragging = handler;