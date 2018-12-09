const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});

module.exports = {
	context: path.resolve(__dirname, 'src'),

    entry: './index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV', 'DEBUG',
            'API_PROTOCOL', 'API_PORT', 'API_HOST'
        ]),
    	new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractPlugin
    ],

    devServer: {
	    contentBase: path.resolve(__dirname, 'build'),
	    stats: 'errors-only',
	    port: 8086,
	    compress: false,
        historyApiFallback: true
	},

	module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/',
                    }
                }]
            },

            // CSS Modules
            {
            	test: /\.css$/,
            	loader: 'style-loader'
            },
            {
            	test: /\.css$/,
            	loader: 'css-loader',
            	query: {
            		modules: true,
            		localIdentName: '[name]__[local]___[hash:base64:5]'
            	}

            },

            // JS loaders
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            ["transform-object-rest-spread", { "useBuiltIns": true }],
                            ["transform-class-properties"]
                        ]
                    }
                }
            }
        ]
    },

    resolve: {
        alias: {
            data: path.resolve(__dirname, 'src/data/'),
            js: path.resolve(__dirname, 'src/js/'),
            components: path.resolve(__dirname, 'src/components/'),
            css: path.resolve(__dirname, 'src/css/')
        }
    }
}
