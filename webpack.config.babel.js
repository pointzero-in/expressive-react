import path from 'path'

import webpack from 'webpack';
import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

export default {
	entry: [
		'react-hot-loader/patch',
		'./src/client',
	],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							'es2015',
							'stage-2'
						]
					}
				}],
				exclude: /node_modules/
			},
		],
	},
	devtool: isProd ? false : 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		port: WDS_PORT,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
}
