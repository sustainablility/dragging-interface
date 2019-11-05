import frameRender from './render/frameWork'; // render frame

import iconsRender from './render/iconOnSide'; // render icons
import loadProcedure from "./action/getProcedure";
import toolsBarRender from './render/toolsBar';

import './style/index.scss';

class DraggingInterface {
    constructor(){
    }
    async init(basicElementSelector) {
        let basicElement = document.querySelector(basicElementSelector);
        if (basicElement === undefined || basicElement === null) {
            throw new Error("element does not existed");
        }

        let [frameSide,frameMain,frameToolsBar] = await frameRender(basicElement);
        this.frameSide = frameSide;
        this.frameMain = frameMain;
        this.frameToolsBar = frameToolsBar;
        await iconsRender(frameSide);
        await toolsBarRender(frameToolsBar,frameMain);
        document.oncontextmenu = () => {
            return false;
        };
    }

    async addProcedure(procedureContent, procedureName) {
        loadProcedure(this.frameMain, procedureContent);
    }

    async hookers(cbForSavingProcedure, cbForRuningProcedure) {
        window["draggingInterfaceLib"] = {};
        window["draggingInterfaceLib"].cbForSavingProcedure = cbForSavingProcedure;
        window["draggingInterfaceLib"].cbForRuningProcedure = cbForRuningProcedure;
    }
}


window.DraggingInterface = DraggingInterface;