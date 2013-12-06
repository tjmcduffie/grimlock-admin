# grimlock-admin

Admin interface for Grimlock project

## Getting Started

Make sure you have the latest packages installed

```
npm install
bower install
```

Note: If you don't have `npm` installed, make sure you have
[node](http://nodejs.com) installed. If you don't have bower,
`npm install -g bower`.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com),
[requirejs](http://requirejs.org), and [jquery](http://jquery.com).

## Running the server

You can run the app using `grunt server`. This will start a
server on `localhost:8000`, and open the URL automatically in your default
browser.

@TODO
Optional flags may be passed to the `grunt sever` command. If no flags are
passed the server will run in dev mode - with uncompiled scripts, and browsable
directories. Other environments may be accessed with the following commands:
`grunt sever:dev` (default)
`grunt sever:cert`
`grunt sever:prod`


## Building the application

@TODO
This application uses requirejs to load the various modules in
the app folder. However, upon build, all of these files are
concatenated and minified together to create a small, compressed
javascript file.

@TODO - will probably have a build specific task, `grunt build` or similar. All
        assets wil be published to the `/dist/` dir. CSS & JS will get version
        numbers in the file names to help prevent any caching issues with future
        versions.
Running `grunt` by itself will run through all of the steps of
linting the javascript, building out dependencies and ultimately
creating `/dist/require.js`.

### Tests

@TODO Tesgting will happen, probably with Jasmine or QUnit

## Deploying your application on a server

@TODO 1. determine hosting environment. 2. figure out whats needed to
deploy - scp, git clone, proprietary script, etc. 3. profit.
