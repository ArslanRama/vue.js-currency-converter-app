module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    },
    entry: './src/main.js'
  }
};
