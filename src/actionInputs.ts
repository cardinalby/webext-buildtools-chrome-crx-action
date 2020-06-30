import { actionInputs as inputs, transformIfSet } from 'github-actions-utils';

export const actionInputs = {
    zipFilePath: inputs.getWsPath('zipFilePath', true),
    crxFilePath: inputs.getWsPath('crxFilePath', true),
    privateKey: inputs.getString('privateKey', true, true),

    updateXmlPath: inputs.getWsPath('updateXmlPath', false),
    updateXmlCodebaseUrl: inputs.getString('updateXmlCodebaseUrl', false),
    updateXmlAppId: inputs.getString('updateXmlAppId', false)
}