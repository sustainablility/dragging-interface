import renderStuff from '../render/renderStuffOnWorkspaceWhenIconOnSideHasBeenClicked'
import IDGenerator from '../lib/randomIDGenerator';
function actionOnClickingSide(workspace,iconType) {
    renderStuff(workspace,iconType,IDGenerator());
}

export default actionOnClickingSide;