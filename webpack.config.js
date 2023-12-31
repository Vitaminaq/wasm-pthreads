module.exports = {
    entry: "./ui/index.js",
    output: {
      filename: "bundle.js",
      publicPath: "dist/",
      globalObject: 'typeof self !== "object" ? self : this'
    },
    module: {
      rules: [
        {
          test: /\.worker\.js/,
          use: {
            loader: "worker-loader",
            options: { inline: "fallback", }
          }
        },
        {
          test: /\.wasm$/,
          type:
            "javascript/auto" /** this disables webpacks default handling of wasm */,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "wasm/[name].[hash].[ext]",
                publicPath: "/dist/"
              }
            }
          ]
        }
      ]
    }
  };