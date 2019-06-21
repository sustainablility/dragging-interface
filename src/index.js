import frameRender from './render/frameWork'; // render frame

import iconsRender from './render/iconOnSide'; // render icons

import toolsBarRender from './render/toolsBar';

import './style/index.scss';

async function handler(basicElementSelector) {
    let basicElement = document.querySelector(basicElementSelector);
    if (basicElement === undefined || basicElement === null) {
        throw new Error("element does not existed");
    }
    let [frameSide,frameMain,frameToolsBar] = await frameRender(basicElement);
    await iconsRender(frameSide);
    await toolsBarRender(frameToolsBar,frameMain);
}

window.dragging = handler;