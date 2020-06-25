import { ActionOutput } from 'github-actions-utils';

export const actionOutputs = {
    extensionName: new ActionOutput('extensionName'),
    extensionVersion: new ActionOutput('extensionVersion'),
    crxFilePath: new ActionOutput('crxFilePath'),
    updateXmlFilePath: new ActionOutput('updateXmlFilePath')
}