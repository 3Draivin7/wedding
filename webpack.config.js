const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
    mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
         {
              test: /\.html$/i,
              loader: "html-loader",
         },
]
},
  module: {
    rules: [
      {
        test: '/\.js$/',
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'videos',
              publicPath: '/videos/', // Возможно, не нужен, если publicPath настроен в output
            },
          },
        ],
      },
      // Правило для других медиа-файлов (png, svg, jpg, gif, и т. д.)
      {
        test: /\.(png|ico|svg|jpg|jpeg|jfif|gif|woff(2)?|woff|ttf|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(mp3|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',          // Имя файла в выходной директории
              outputPath: 'audio',         // Подпапка в выходной директории (например, 'dist/audio/')
              publicPath: '/audio/',          // Путь, используемый в HTML/CSS/JS (относительно dist)
            },
          },
        ],
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
}