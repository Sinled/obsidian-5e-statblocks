const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sveltePreprocess = require("svelte-preprocess");

const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "."),
        filename: "main.js",
        libraryTarget: "commonjs"
    },
    target: "node",
    mode: isDevMode ? "development" : "production",
    ...(isDevMode ? { devtool: "eval" } : {}),
    module: {
        rules: [
            {
                test: /importer\.worker\.ts?$/,
                loader: "worker-loader",
                options: {
                    inline: "no-fallback",
                    worker: {
                        type: "Worker",
                        options: {
                            name: "Statblock Importer",
                            esModule: false
                        }
                    }
                }
            },
            {
                test: /watcher\.worker\.ts?$/,
                loader: "worker-loader",
                options: {
                    inline: "no-fallback",
                    worker: {
                        type: "Worker",
                        options: {
                            name: "Statblock Parser",
                            esModule: false
                        }
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },

            {
                test: /\.(svelte)$/,
                use: [
                    { loader: "babel-loader" },
                    {
                        loader: "svelte-loader",
                        options: {
                            preprocess: sveltePreprocess({})
                        }
                    }
                ]
            },
            {
                test: /\.css?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.(svg|njk|html)$/,
                type: "asset/source"
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./manifest.json", to: "." },
                { from: "./src/main.css", to: "./styles.css" }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
    resolve: {
        alias: {
            svelte: path.resolve("node_modules", "svelte"),
            "~": path.resolve(__dirname, "src"),
            src: path.resolve(__dirname, "src")
        },
        extensions: [".ts", ".tsx", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"]
    },
    externals: {
        electron: "commonjs2 electron",
        obsidian: "commonjs2 obsidian"
    }
};
