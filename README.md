![Node.js CI](https://github.com/cardinalby/webext-buildtools-chrome-crx-action/workflows/build-test/badge.svg)

# Build signed crx file for your WebExtension

The action allows you to build and sign your Web Extension for offline distribution. 
Read more details at [Alternative Extension Distribution Options](https://developer.chrome.com/apps/external_extensions).

Based on [ChromeCrxBuilder](https://www.npmjs.com/package/webext-buildtools-chrome-crx-builder) and 
[DirReaderBuilder](https://www.npmjs.com/package/webext-buildtools-dir-reader-mw) packages.

## Inputs

* `extensionDir`
**Required** Path to WebExtension directory (relative to repository)

* `crxFilePath`
**Required** Path to save result crx file ((relative to repository))

* `privateKey`
**Required** Contents of private key used to sign crx file. Save it to Secrets!

* `updateXmlPath`
Optional: path to save update.xml file (relative to repository) for extensions hosted not on Chrome Web Store. 
This xml is used as response at url, specified in manifest''s `update_url` key file.

* `updateXmlCodebaseUrl`
Required, if you specified updateXmlPath. URL to the .crx file for clients.

* `updateXmlAppId`
App Id to use in update.xml file. Generated from private key by default.

* `updateXmlAppId`
App Id to use in update.xml file. Generated from private key by default.

* `zipGlobPattern`
Include files according to the pattern while packing crx. 
Default: `**`

* `zipIgnore`
Patterns of files which will be excluded from the zip, separated by `|`. 
Default: `*.pem|.git|*.crx`

## Outputs
* `extensionName` from extension's manifest
* `extensionVersion` from extension's manifest
* `crxFilePath` the absolute path to built crx file
* `updateXmlFilePath` the absolute path to built update.xml file

## Example usage

```yaml
uses: cardinalby/webext-buildtools-chrome-crx-action@v1
with:
  extensionDir: 'extension'
  crxFilePath: 'build/extension.crx'
  privateKey: ${{ secrets.CHROME_CRX_PRIVATE_KEY }}
```
