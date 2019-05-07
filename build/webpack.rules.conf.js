const rules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            'babel-loader'
        ]
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.(jpg|png|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'images/',
                publichPath: '../images',
                limit: 10240
            }
        }
    },
    {
        test: /\.(eot|ttf|svg|woff)$/,
        use:{
            loader:'file-loader',
            options: {
                outputPath: 'fonts/',
                publichPath: '../fonts',
            }
        }
    }
]

module.exports = rules