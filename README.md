# Reforming Education on Drugs (RED) Website

Reforming Education on Drugs (RED) is a non-profit student-run club at the University of Calgary. This is the code repository for the official website. Please visit http://www.rededucate.com for more information.

## Getting Started

```
npm install
```

## Development

This project has been configured for the development of the website in ReactJS, using Webpack to bundle all project files into one JavaScript file - **bundle.js**. 

### Running a Development Server

The **package.json** file has configured scripts that will help the development and deployment process. To run a development server, simply run the following script in a terminal located in your project's directory.

```
npm run dev
```

Please wait for webpack-dev-server to bundle and serve all of the project's files and load the development website. In **webpack.config.js**, the development server is configured to open a new window or tab and load the development server. It has also been configured to hot-load the development server with new changes when source files are saved.

## Project Structure

### Components
ReactJS components can be commonly used throughout the website and can be re-used in several different pages with potentially different contents. Components should be created and modified in
```
src/app/components
```
An example of a component is the Header component named **Header.js**, which is being used on all pages because it is the site's navigation bar and routing component. 

### Pages
Any page on the website should be created and modified in
```
src/app/pages
```

### Static Templates
**index.html** is the **development** template that html-webpack-plugin will use to configure the development server. 
The development **index.html** is located in 
```
src/index.html
```

The public **index.html** is the **production** template that must be deployed to the web hosting. The production **index.html** is located in 
```
src/public/index.html
```

#### NOTE: Please ensure parity between both the development and production templates. The difference between the two files is simply the fact that production index.html has a hard-coded reference to **bundle.js**.

## Deployment

```
npm run build
```

This will run Webpack for the production environment. It will bundle all ReactJS, HTML, CSS, and JavaScript files into one file named **bundle.js**. This file is minified for production will be located in
```
src/public/assets/js/bundle.js
```

To deploy this project to the web host, please upload the following folder with all assets included:
```
src/public
```

#### NOTE: For most cases, it is simply only required to upload ```src/public/assets/js/bundle.js``` to the web hosting.

## Running Tests

```
TODO
```

## Built With

* ReactJS
* Webpack

## Contributors

* **Jackie Luc** - [GitHub](https://github.com/jackieluc)
* **Kourosh Banaeianzadeh** - [GitHub](https://github.com/Kouroshb26)

## Additional Resources

* [React-Bootstrap API](https://react-bootstrap.github.io/introduction.html)
* [Airbnb React Lint](https://github.com/airbnb/javascript/tree/master/react)
