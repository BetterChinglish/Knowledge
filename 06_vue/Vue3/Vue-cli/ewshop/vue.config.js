module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'components':'@/components',
                'router':'@/router',
                'store':'@/store',
                'utils':'@/utils',
                'views':'@/views',
                'network':'@/network'

            }
        }
    },
    publicPath:'./'
}