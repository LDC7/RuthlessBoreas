const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = [
  {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader'
      }
    ]
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
  {
    test: /\.(png|jpe?g|gif|ico|svg|webp|txt)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }
  }
];

const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
};

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devtool: 'none',
  resolve: resolve,
  module: {
    rules: rules
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 2048000
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') })
  ]
};
