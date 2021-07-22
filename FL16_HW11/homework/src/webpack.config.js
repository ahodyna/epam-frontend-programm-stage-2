const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { node } = require('webpack')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')




module.exports = (env) => {
    const devMode = env.mode === 'development'
    return {
        mode: env.mode,

        entry: ['@babel/polyfill', './js/app.js'],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './index.html'
            }),
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["optipng", { optimizationLevel: 5 }],
                    ],
                },
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),

        ],
        module: {
            rules: [
             {
                test: /\.(gif|png|jpg|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                          },
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75
                          }
                        }
                      },
                ],
                
            },
                {
                    test: /.s?css$/,
                    use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                },


            ]
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
    }
}