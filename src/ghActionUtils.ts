import * as ghActions from '@actions/core';
import * as path from 'path';

const workspaceDir = process.env[`GITHUB_WORKSPACE`];
if (workspaceDir === undefined) {
    throw new Error('GITHUB_WORKSPACE env variable is not set. Did you perform checkout action?')
}

export const getWorkspacePath = (relativePath: string): string => path.join(workspaceDir, relativePath);

export const getPathInput = (inputName: string): string|undefined => {
    const input = ghActions.getInput(inputName, { required: false });
    return input
        ? getWorkspacePath(input)
        : undefined;
}

export const getRequiredPathInput = (inputName: string): string => {
    const input = ghActions.getInput(inputName, { required: true });
    return getWorkspacePath(input);
}

