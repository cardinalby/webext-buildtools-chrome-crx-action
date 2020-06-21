import { getPathInput, getRequiredPathInput } from './ghActionUtils';
import * as ghActions from '@actions/core';

export const actionInputs = {
    extensionDir: getRequiredPathInput('extensionDir'),
    zipGlobPattern: ghActions.getInput('zipGlobPattern', { required: false }),
    zipIgnore: ghActions.getInput('zipIgnore', { required: false }).split('|'),

    crxFilePath: getRequiredPathInput('crxFilePath'),
    privateKey: ghActions.getInput('privateKey', { required: true }),

    updateXmlPath: getPathInput('updateXmlPath'),
    updateXmlCodebaseUrl: ghActions.getInput('updateXmlCodebaseUrl', { required: false }),
    updateXmlAppId: ghActions.getInput('updateXmlAppId', { required: false }),
}

ghActions.setSecret(actionInputs.privateKey);