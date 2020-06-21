import * as ghActions from '@actions/core';
import ChromeCrxBuilder, {
    ChromeCrxBuildResult,
    IChromeCrxOptions
} from 'webext-buildtools-chrome-crx-builder';
import DirReaderBuilder, {
    DirReaderBuildResult,
    IManifestObject,
    IDirReaderOptions
} from 'webext-buildtools-dir-reader-mw';
import winston, { LogMethod } from 'winston';
import { actionInputs } from './actionInputs';

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
    const dirReaderAssets = (await runDirBuilder(logger)).getAssets();
    if (!dirReaderAssets.zipBuffer || !dirReaderAssets.manifest) {
        throw new Error('Dir reader assets are empty');
    }
    await runCrxBuilder(
        logger,
        dirReaderAssets.zipBuffer.getValue(),
        dirReaderAssets.manifest.getValue()
    );
}

async function runDirBuilder(logger: LogMethod): Promise<DirReaderBuildResult> {
    const options: IDirReaderOptions = {
        zipOptions: {
            globPattern: actionInputs.zipGlobPattern,
            ignore: actionInputs.zipIgnore
        }
    };
    const dirBuilder = new DirReaderBuilder(options, logger);
    dirBuilder.setInputDirPath(actionInputs.extensionDir);
    dirBuilder.requireZipBuffer();
    dirBuilder.requireManifest();
    return dirBuilder.build();
}

async function runCrxBuilder(
    logger: LogMethod,
    zipBuffer: Buffer,
    manifest: IManifestObject
): Promise<ChromeCrxBuildResult> {
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

    crxBuilder.setInputManifest(manifest)
    crxBuilder.setInputZipBuffer(zipBuffer);
    crxBuilder.requireCrxFile();
    if (actionInputs.updateXmlPath) {
        crxBuilder.requireUpdateXmlFile();
    }
    return crxBuilder.build();
}

function getLogger(): LogMethod {
    const logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.cli()
        ),
        transports: [new winston.transports.Console()]
    });
    return logger.log.bind(logger);
}
