var path = require('path');
const Webpack = require('webpack');
module.exports = env => {
    return {
        entry: './dist/index.js',
        target: 'node',
        mode: env === 'prod' ? 'production' : 'development',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'metadata-extractor.js'
        },
        devtool: 'source-map',
        plugins: [new Webpack.EnvironmentPlugin(['NODE_ENV']), new Webpack.IgnorePlugin(/uws/)],
        module: {
            rules: [
                {
                    test: /\.node$/,
                    loader: 'native-ext-loader'
                }
            ]
        }
    };
};
