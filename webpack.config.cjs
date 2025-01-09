const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
require("dotenv").config(); // Load .env variables into process.env

module.exports = {
  entry: "./src/index.js", // Adjust according to your project structure
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.WEATHER_API_KEY": JSON.stringify(
        process.env.WEATHER_API_KEY
      ),
    }),
  ],
};
