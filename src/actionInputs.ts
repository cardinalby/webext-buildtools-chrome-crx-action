import * as ghActions from '@actions/core';

export const actionInputs = {
    extensionDir: ghActions.getInput('extensionDir', { required: true }),
    zipGlobPattern: ghActions.getInput('zipGlobPattern', { required: false }),
    zipIgnore: ghActions.getInput('zipIgnore', { required: false }).split('|'),

    crxFilePath: ghActions.getInput('crxFilePath', { required: true }),
    privateKey: ghActions.getInput('privateKey', { required: true }),

    updateXmlPath: ghActions.getInput('updateXmlPath', { required: false }),
    updateXmlCodebaseUrl: ghActions.getInput('updateXmlCodebaseUrl', { required: false }),
    updateXmlAppId: ghActions.getInput('updateXmlAppId', { required: false }),
}

ghActions.setSecret(actionInputs.privateKey);