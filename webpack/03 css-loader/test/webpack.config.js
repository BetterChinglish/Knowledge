const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');

module.exports={
  mode:'development',
  entry:'./src/index.js',
  devtool:'source-map',
  output:{
    filename:'bundle.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:[
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      filename:'index.html',
      minify:false
    })
  ]
}
