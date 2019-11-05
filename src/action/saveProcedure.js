function saveProcedure(workspace) {
    if (window["draggingInterfaceLib"].cbForSavingProcedure !== undefined) {
        window["draggingInterfaceLib"].cbForSavingProcedure(workspace.innerHTML);
    }
}

export default saveProcedure;