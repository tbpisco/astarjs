const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");

module.exports = options => {
    return {
        mode: "development",

        entry: {
            main: path.resolve("examples/src/app.ts")
        },

        output: {
            path: __dirname + "/dist",
            filename: "game.[hash].js"
        },

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve("examples/index.html"),
                inject: false
            }),

            new SimpleProgressPlugin(),

            new OpenBrowserPlugin({ url: "http://127.0.0.1:3000/webpack-dev-server/" })
        ],

        resolve: {
            extensions: [".ts", ".js", ".json"]
        },

        devServer: {
            host: "127.0.0.1",
            port: 3000,
            contentBase: [path.join(__dirname, "examples")],
            hot: true,
            disableHostCheck: true,
            inline:false
        }

    }
};
