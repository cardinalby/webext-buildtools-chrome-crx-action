import {RunTarget, RunOptions, deleteAllFakedDirs} from "github-action-ts-run-api";
import * as path from "path";
import {PathLike} from "fs";
import * as crypto from "crypto";
import { zip } from 'zip-a-folder';
import * as fs from 'fs-extra';

describe('webext-buildtools-chrome-crx-action', () => {
    const extensionDir = path.join(__dirname, 'extension');
    const outDirPath = path.join(__dirname, 'out');
    const privateKeyFilePath = path.join(outDirPath, 'private.pem');
    const zipFilePath = path.join(outDirPath, 'extension.zip');
    const crxFilePath = path.join(outDirPath, 'extension.crx');
    const updateXmlFilePath = path.join(outDirPath, 'update.xml');

    const rm = (path: PathLike) => fs.existsSync(path) && fs.rmSync(path);

    const target = process.env.CI
        ? RunTarget.mainJs('action.yml')
        : RunTarget.jsFile('lib/main.js', 'action.yml');

    beforeAll(async () => {
        const privateKey = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        }).privateKey;
        fs.writeFileSync(privateKeyFilePath, privateKey);

        await zip(extensionDir, zipFilePath);
    })

    afterEach(() => {
        rm(crxFilePath);
        rm(updateXmlFilePath);
    })

    afterAll(() => {
        rm(privateKeyFilePath);
        rm(zipFilePath);
        deleteAllFakedDirs()
    })

    test.each([
        [false],
        [true]
    ])(
        'build from zip, requireUpdateXml: %s',
        async (requireUpdateXml) => {
            const res = await target.run(RunOptions.create({
                inputs: {
                    zipFilePath: zipFilePath,
                    crxFilePath: crxFilePath,
                    privateKey: fs.readFileSync(privateKeyFilePath).toString(),
                    updateXmlPath: requireUpdateXml ? updateXmlFilePath : undefined,
                    updateXmlCodebaseUrl: requireUpdateXml ? 'https://test.com/ex.crx' : undefined
                }
            }));
            expect(res.isSuccess).toBeTruthy();
            expect(res.commands.outputs).toEqual(requireUpdateXml
                ? {crxFilePath: crxFilePath, updateXmlFilePath: updateXmlFilePath}
                : {crxFilePath: crxFilePath}
            )
            expect(fs.existsSync(crxFilePath)).toBeTruthy();
            if (requireUpdateXml) {
                expect(fs.existsSync(updateXmlFilePath)).toBeTruthy();
            }
            expect(res.warnings).toHaveLength(0);
        })
})