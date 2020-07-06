module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'api': '@api',
                'scroll': '@scroll',
                'Vuetify': '@Vuetify'
            }
        }
    },
    publicPath: "/",
    lintOnSave: false // 关闭 eslint 检查
}