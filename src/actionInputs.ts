import { actionInputs as inputs } from 'github-actions-utils';

export const actionInputs = {
    zipFilePath: inputs.getString('zipFilePath', true),
    crxFilePath: inputs.getString('crxFilePath', true),
    privateKey: inputs.getString('privateKey', true, true),

    updateXmlPath: inputs.getString('updateXmlPath', false),
    updateXmlCodebaseUrl: inputs.getString('updateXmlCodebaseUrl', false),
    updateXmlAppId: inputs.getString('updateXmlAppId', false)
}