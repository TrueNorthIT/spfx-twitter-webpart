## twitter-webpart

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean 
gulp test 
gulp serve
gulp bundle 
gulp package-solution 

## Ship to azure

see https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/deploy-web-part-to-cdn 

### only if manifest has changed and drop into sharepoint
gulp package-solution --ship 

### Build client SPA
gulp --ship
gulp deploy-azure-storage
copy .\sharepoint\solution to via the app catalog site