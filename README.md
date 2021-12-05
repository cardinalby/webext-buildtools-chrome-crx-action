![Node.js CI](https://github.com/cardinalby/webext-buildtools-chrome-crx-action/workflows/build-test/badge.svg)

# Build signed crx file for your WebExtension

The action allows you to build and sign your Web Extension for offline distribution. 
Read more details at [Alternative Extension Distribution Options](https://developer.chrome.com/apps/external_extensions).

Based on [ChromeCrxBuilder](https://www.npmjs.com/package/webext-buildtools-chrome-crx-builder) package.

## Inputs

* `zipFilePath` **Required**<br> 
Path to zip file with extension (relative to repository)

* `crxFilePath` **Required**<br>
Path to save result crx file (relative to repository)

* `privateKey` **Required**<br>
Contents of private key used to sign crx file. Save it to Secrets!

* `updateXmlPath`<br>
path to save update.xml file (relative to repository) for extensions hosted not on Chrome Web Store. 
This xml is used as response at url, specified in manifest''s `update_url` key file.<br>
If specified, set the following inputs:  
    * `updateXmlCodebaseUrl`**Required**<br>
    URL to the .crx file for clients.
    
    * `updateXmlAppId`<br>
    App Id to use in update.xml file. Generated from private key by default.

## Outputs
* `crxFilePath` the absolute path to built crx file
* `updateXmlFilePath` the absolute path to built update.xml file

## Prepare inputs first
Use [webext-buildtools-pack-extension-dir-action](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action)
to pack your extension directory and provide `zipFilePath` input (see example).

## Usage example

```yaml
steps:
  # pack zip and read manifest, can be reused in the following steps
  - id: packExtensionDir
    uses: cardinalby/webext-buildtools-pack-extension-dir-action@v1
    with:
      extensionDir: 'extension'
      zipFilePath: 'build/extension.zip'
  
  - uses: cardinalby/webext-buildtools-chrome-crx-action@v2
    with:
      # zip file made at the packExtensionDir step
      zipFilePath: 'build/extension.zip'
      crxFilePath: 'build/extension.crx'
      privateKey: ${{ secrets.CHROME_CRX_PRIVATE_KEY }}
      # The following is optional if you need update.xml file
      updateXmlPath: 'build/update.xml'
      updateXmlCodebaseUrl: 'http://...'
```

---
If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://dev.to/cardinalby/webextension-deployment-and-publishing-using-github-actions-522o).