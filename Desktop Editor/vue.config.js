const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  // Define the dist folder
  outputDir: 'dist',

  // Define the assets folder
  assetsDir: 'assets',
})
