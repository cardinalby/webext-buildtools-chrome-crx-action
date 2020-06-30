import { ActionOutput } from 'github-actions-utils';

export const actionOutputs = {
    crxFilePath: new ActionOutput('crxFilePath'),
    updateXmlFilePath: new ActionOutput('updateXmlFilePath')
}