module.exports = {
	entry: './assets/src/js/audio-player/app.jsx',
	output: {
		path: __dirname,
		filename: './assets/dist/js/bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules)/
			}
		]
	}
};
