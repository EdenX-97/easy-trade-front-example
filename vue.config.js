/**
 * @Description: Vue-cli的配置文件
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
        .test(/\.pdf|ico$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          limit: 10000,
        })
    config.plugin('html').tap(args => {
      args[0].title = '简单买卖'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver({
          exclude: new RegExp(/^(?!.*loading-directive).*$/)
        })],
      }),
      Components({
        resolvers: [ElementPlusResolver(),],
      }),
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
