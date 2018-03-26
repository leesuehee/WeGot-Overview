const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '../proxy-sue/public/service');

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        },
      },
    ],
  }
};

const client = {
entry: './client.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  }  
};  

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs-module'
  }  
};  

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];  


// original build
// module.exports = {
//   resolve: {
//     extensions: ['.js', '.jsx']  
//   },
//   devtool: 'source-map',
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     path: DIST_DIR,  
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   module : {
//     loaders : [
//       {
//         test: /\.jsx?/,  
//         include: SRC_DIR,
//         exclude: ['node_modules'],
//         loader: 'babel-loader',      
//         query: {
//           presets: ['react', 'env']  
//         }
//       },
//       {
//         test: /\.css$/,  
//         use: [
//           'style-loader',  
//           'css-loader'
//         ]
//       }
//     ]
//   }
// };


