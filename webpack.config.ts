import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/lambda.ts', // Your lambda entry point
  target: 'node', // Target Node.js environment
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'lambda.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2', // Required for Lambda
  },
};

export default config;


// import path from 'path';
// import webpack from 'webpack';
// import nodeExternals from 'webpack-node-externals';

// const config: webpack.Configuration = {
//   mode: 'production', // or 'development'
//   entry: path.resolve(__dirname, 'src/serverless.ts'),
//   target: 'node',
//   externals: [nodeExternals()],
  
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//     alias: {
//       src: path.resolve(__dirname, 'src'), // Ensure this matches your directory structure
//     },
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//     libraryTarget: 'commonjs2',
//   },
//   optimization: {
//     minimize: false,
//   },
// };

// export default config;

// // module.exports = (options, webpack) => {
// //     const lazyImports = [
// //       '@nestjs/microservices/microservices-module',
// //       '@nestjs/websockets/socket-module',
// //     ];
  
// //     return {
// //       ...options,
// //       externals: [],
// //       output: {
// //         ...options.output,
// //         libraryTarget: 'commonjs2',
// //       },
// //       plugins: [
// //         ...options.plugins,
// //         new webpack.IgnorePlugin({
// //           checkResource(resource) {
// //             if (lazyImports.includes(resource)) {
// //               try {
// //                 require.resolve(resource);
// //               } catch (err) {
// //                 return true;
// //               }
// //             }
// //             return false;
// //           },
// //         }),
// //       ],
// //     };
// //   };