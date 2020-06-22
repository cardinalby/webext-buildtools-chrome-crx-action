import { actionInputs as inputs, transformIfSet } from 'github-actions-utils';

export const actionInputs = {
    extensionDir: inputs.getWsPath('extensionDir', true),
    zipGlobPattern: inputs.getString('zipGlobPattern', false),
    zipIgnore: transformIfSet(inputs.getString('zipIgnore', false), s => s.split('|')),

    crxFilePath: inputs.getWsPath('crxFilePath', true),
    privateKey: inputs.getString('privateKey', true, true),

    updateXmlPath: inputs.getWsPath('updateXmlPath', false),
    updateXmlCodebaseUrl: inputs.getString('updateXmlCodebaseUrl', false),
    updateXmlAppId: inputs.getString('updateXmlAppId', false)
}