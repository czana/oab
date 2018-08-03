import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

export default {
  mode: 'development',
  entry: './client/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'client/components'),
      '@styles': path.resolve(__dirname, 'client/styles'),
      '@wrappers': path.resolve(__dirname, 'client/wrappers')
    }
  },
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx$/,
        exclude: /node_modules/
      },
      {
        test: /\.s*css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
}
