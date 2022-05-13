![Node.js CI](https://github.com/cardinalby/webext-buildtools-chrome-crx-action/workflows/build-test/badge.svg)

# Build signed crx file for your WebExtension

The action allows you to build and sign your Web Extension for offline distribution. 
Read more details at [Alternative Extension Distribution Options](https://developer.chrome.com/docs/extensions/mv3/external_extensions/).

Based on [ChromeCrxBuilder](https://www.npmjs.com/package/webext-buildtools-chrome-crx-builder) package.

## Inputs

### 🔸 `zipFilePath` **Required** 
Path to zip file with extension (relative to repository)

### 🔸 `crxFilePath` **Required**
Path to save result crx file (relative to repository)

### 🔸 `privateKey` **Required**
Contents of private key used to sign crx file. Save it to Secrets!

You can generate PEM key pair using `ssh-keygen -t rsa -m PEM` command. 

### 🔸 `updateXmlPath`<br>
Path to save update.xml file (relative to repository) for extensions hosted not on Chrome Web Store. 
This xml is used as response at url, specified in manifest's [`update_url`](https://developer.chrome.com/docs/extensions/mv3/linux_hosting/#update_url) key file.

If this input is specified, set the following inputs:

#### 🔹 `updateXmlCodebaseUrl` **Required**
URL to the .crx file for clients (will be added to generated XML)
    
#### 🔹 `updateXmlAppId`
App Id to use in update.xml file. Generated from private key by default.

## Outputs
### 🔻 `crxFilePath`
The absolute path to built crx file

### 🔻 `updateXmlFilePath`
The absolute path to built update.xml file

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
      updateXmlCodebaseUrl: 'https://server.com/extension.crx'
```

---
If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://cardinalby.github.io/blog/post/github-actions/webext/1-introduction/).