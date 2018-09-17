# Reforming Education on Drugs (RED) Website

Reforming Education on Drugs (RED) is a non-profit student-run club at the University of Calgary. This is the code repository for the official website. Please visit https://www.rededucate.com for more information.

## Contributors

* **Jackie Luc** - [GitHub](https://github.com/jackieluc)
* **Kourosh Banaeianzadeh** - [GitHub](https://github.com/Kouroshb26)
* **Araz Minhas** - [GitHub](https://github.com/arazzz)

## Getting started

```
npm install
```

## Local development

Developing on MacOSX? Install Homebrew to install watchman to start a local server successfully:  
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" ; brew install watchman
```

Starting the local server:  
```
npm start
```

Please wait for Webpack to bundle and serve all of the project's files and load the development website. In **webpack.config.dev.js**, the development server is configured to open a new window or tab and load the development server. It has also been configured to hot-load the development server with new changes when source files are saved.

## Deployment

```
npm run build
```

This will run Webpack for the production environment, using **webpack.config.prod.js**. It will bundle all ReactJS, HTML, and CSS and export it all into the ``/dist`` directory. Simply copy the entire contents of the ``/dist`` directory and publish it in the production web host directory.


## Project Structure

```
.
├── .editorconfig             # Configures editor rules
├── .gitignore                # Tells git which files to ignore
├── .npmrc                    # Configures npm to save exact by default
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── assets                # Image and font assets
│   ├── components            # React components
│   ├── data                  # JSON data of repetitive content
│   ├── files                 # Files that we serve (ie. PDF)
|   |__ pages                 # Pages that exist in the website
|   |__ styles                # CSS styles, written in Sass
│   ├── index.ejs             # Template for homepage
│   ├── index.jsx             # Entry point for your app
├── tools                     # Node scripts that run build related tools
│   ├── build.js              # Runs the production build
│   ├── chalkConfig.js        # Centralized configuration for chalk (adds color to console statements)
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── nodeVersionCheck.js   # Confirm supported Node version is installed
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
│   ├── startMessage.js       # Display message when development build starts
│   └── analyzeBundle.js      # Analyzes the webpack bundle
├── webpack.config.dev.js     # Configures webpack for development builds
└── webpack.config.prod.js    # Configures webpack for production builds
```

## Built With

* ReactJS
* Webpack


## Additional Resources

* [React-slingshot](https://github.com/coryhouse/react-slingshot)
* [React-Bootstrap API](https://react-bootstrap.github.io/introduction.html)
* [Airbnb React Lint](https://github.com/airbnb/javascript/tree/master/react)