// 使用了webpack-chain链式API的调用方式，简化了对webpack配置的修改
const path = require("path");
const merge = require("deepmerge");
const version = require("./package.json").version;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  lintOnSave: false, // 是否使用eslint
  devServer: {
    port: 8000, // 设置端口号
    host: "0.0.0.0", // 配置可手机访问
    open: false // 配置自动启动浏览器
  },
  // 去掉文件名中的 hash
  // filenameHashing: false,
  // css: {
  //   modules: true,
  //   loaderOptions: {
  //     css: {
  //       localIdentName: '[name]-[hash]',
  //       camelCase: 'only'
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set("@/image", resolve("src/assets/images"))
      .set("styles", resolve("src/assets/styles"))
      .set("@/http", resolve("src/http"))
      .set("@/lib", resolve("src/lib"));
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }));
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options =>
        merge(options, {
          loaders: {
            i18n: "@kazupon/vue-i18n-loader"
          }
        })
      );
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end()
      .use("yaml")
      .loader("yaml-loader")
      .end();

    // 压缩代码
    config.optimization.minimize(true);

    // 删除 HTML 相关的 webpack 插件
    // config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      console.log("生产环境:prod");
    } else {
      // 为开发环境修改配置...
      console.log("开发环境:dev");
    }
  }
};
