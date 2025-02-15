const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (options) => {

    if (!options) options = { production: false, karma: false };

    let tsconfig = !options.karma ? "tsconfig.json" : "tsconfig.test.json";
    let output = options.production ? "dist" : "dist-test";
    let filename = options.karma ? "[name].[hash].js" : (options.production ? "pathfinding.min.js" : "pathfinding.js");

    return {
        mode: options.production ? 'production': 'development',

        entry: {
            main: path.join(__dirname, "src/index.ts")
        },

        output: {
            path: path.join(__dirname, output),
            filename: filename,
            library: {
                name: "Pathfinding",
                type: "var"
            } 
        },

        devtool: options.production ? undefined : 'source-map',

        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
                    options: {
                        configFile: tsconfig
                    }
                }
            ]
        },

        optimization: {
			minimize: options.production,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: 5,
						compress: { drop_console: true },
						output: { comments: false, beautify: false },
					},
				}),
			],
		},

        resolve: {
            extensions: [".ts", ".js", ".json"]
        }
    }
};
