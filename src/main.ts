import * as ghActions from '@actions/core';
import ChromeCrxBuilder, { IChromeCrxOptions } from 'webext-buildtools-chrome-crx-builder';
import { actionInputs } from './actionInputs';
import { actionOutputs } from './actionOutputs';
import { getLogger } from './logger';
import * as fs from 'fs'

// noinspection JSUnusedLocalSymbols
async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
    }
}

async function runImpl() {
    const logger = getLogger();

    const options: IChromeCrxOptions = {
        crxFilePath: actionInputs.crxFilePath,
        privateKey: Buffer.from(actionInputs.privateKey)
    };

    if (actionInputs.updateXmlPath) {
        if (!actionInputs.updateXmlCodebaseUrl) {
            throw new Error('updateXmlCodebaseUrl input required if you specified updateXmlPath');
        }
        options.updateXml = {
            outFilePath: actionInputs.updateXmlPath,
            codebaseUrl: actionInputs.updateXmlCodebaseUrl
        }
        if (actionInputs.updateXmlAppId) {
            options.updateXml.appId = actionInputs.updateXmlAppId;
        }
    }

    const crxBuilder = new ChromeCrxBuilder(options, logger);

    ghActions.info(`Reading ${actionInputs.zipFilePath}...`);
    crxBuilder.setInputZipBuffer(fs.readFileSync(actionInputs.zipFilePath));
    crxBuilder.requireCrxFile();

    if (actionInputs.updateXmlPath) {
        crxBuilder.requireUpdateXmlFile();
    }

    ghActions.info(`Signing crx...`);
    const resultAssets = (await crxBuilder.build()).getAssets();

    if (resultAssets.crxFile) {
        actionOutputs.crxFilePath.setValue(resultAssets.crxFile.getValue());
    }

    if (resultAssets.updateXmlFile) {
        actionOutputs.updateXmlFilePath.setValue(resultAssets.updateXmlFile.getValue());
    }
}

// noinspection JSIgnoredPromiseFromCall
run();