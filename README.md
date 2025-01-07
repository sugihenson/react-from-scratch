# Create React App from scratch (no framework)

https://hackteam.io/blog/create-react-project-from-scratch-without-framework/

* Create new directory and cd
* `npm init -y`
* `npm install --save-dev webpack webpack-cli`
* Create new directory src, and then index.js inside of it
* Add the following to package.json inside \scripts\
	* "start": "webpack --mode development"
	* "build": "webpack --mode=production"\
* `npm start`
* `npm install react react-dom`
* `npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react\`
* create webpack.config.js and add:
```
module.exports = {
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```
* create babel.config.json and add:
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ],
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```
* Add the following to index.js:
```
import ReactDOM from 'react-dom/client';
function App() {
  return <h1>Hello World</h1>;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
```
* create new directory public and index.html inside of it containing:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <main id="root"></main>
  </body>
</html>
```
* `npm install --save-dev html-webpack-plugin`
* Add the following to webpack.config.js:
```
plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
```
* `npm start`
* Error: Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (1:0)
Fix: change type in package.json to module
```
Error: Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (1:0)
```
* Fix: change “type” in package.json to “module”
```
Error: 
[webpack-cli] Failed to load '/Users/sugihenson/code/sugihenson/react-from-scratch/webpack.config.js' config
[webpack-cli] ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and '/Users/sugihenson/code/sugihenson/react-from-scratch/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```
* Fix: change webpack.config.js to webpack.config.cjs
* `npm install --save-dev webpack-dev-server`
* change the following in package.json in \scripts\:

```
"start": "webpack serve --mode=development"
````
* Npm start now starts development server!
* Created new git repo, added node modules to gitignore as per vscode suggestion
* Created new GitHub repo:
```
gh repo create react-from-scratch --public --source=. --remote=origin
ga  .
gc -m 'first commit'
gp origin master
```
