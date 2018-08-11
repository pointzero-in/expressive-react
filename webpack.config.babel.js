import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

export default {
	entry: {
		vendor: ['antd'],
		app: ['babel-polyfill', 'react-hot-loader/patch', './src/client'],
	},
	output: {
		filename: 'static/js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'stage-2',
						],
						plugins: [
							"transform-decorators-legacy",
						],
					},
				}],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	mode: isProd ? 'production' : 'development',
	devtool: isProd ? false : 'source-map',
	resolve: {
		extensions: ['.js'],
	},
	devServer: {
		port: WDS_PORT,
		historyApiFallback: true,
		hot: true,
		compress: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						test: 'vendor',
						name: 'vendor',
						enforce: true,
					},
				},
			},
		},
	plugins: [
		new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};
