const path =require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')  //自动更新
//导入每次删除文件的包
//const CleanWebpackPlugin=require('clean-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  //坑。。引入方法开头必须为
const webpack =require('webpack')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //以前版本的压缩
const TerserPlugin = require('terser-webpack-plugin');  //webpack压缩js配置
//导入抽取CSS的插件
const ExtractTextPlugin=require('extract-text-webpack-plugin')
//导入压缩css的插件
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin')
module.exports={
    entry:{
        app:path.join(__dirname,'./src/main.js'),
        commons:['jquery'] //把要抽离的第三方包的名称放到此数组中

    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'js/bundle.js'
    },
    optimization: {
        splitChunks: {
               cacheGroups: {
                   commons: {
                       name: "commons",
                       filename:'js/common.js',
                       chunks: "initial",
                       minChunks: 2
                   }
               }
           },
           minimizer: [
            new TerserPlugin({
                cache: true, // 开启缓存
                parallel: true, // 支持多进程
                sourceMap: true, 
            }),
        ]
       },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'), 
            filename:'index.html',
            minify:{
                //优化选项。还有很多其他优化选项
                collapseWhitespace:true,//合并多余空格
                removeComments:true,   //擦除注释
                removeAttributeQuotes:true  //移除属性上的双引号
            }
        }),
        new CleanWebpackPlugin(),
        new ExtractTextPlugin('css/styles.css'), //抽取css文件
        new OptimizeCssAssetsPlugin()//压缩CSS插件
    ],
    module:{
        rules:[
            //创建一个.css文件,然后import引入到main.js中,下载包,npm i ,配置rules
				//调用顺序从右到左.
			{test: /\.css$/,use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                    use: "css-loader",
                    publicPath:`../`  //在路径上加上../前缀

            })},//配置处理.css文件的第三方loader规则转换
			{test: /\.less$/,use:['style-loader','css-loader','less-loader']},//这是处理less的第三方规则
			{test: /\.scss$/,use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: ["css-loader","sass-loader"],
                publicPath:`../`  //在路径上加上../前缀


            })},//这是处理.scss文件的第三方loader规则
            {test: /\.jpg|png|gif|bmp|jpeg$/,use:'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'}, //处理图片路径的loader,只有一个url-loader所以不用数组
			//url-loader后边可以加参数,例如limit,给定的值是图片大小,单位是字节,如果参数值大于其大小,会转换成base64的.
			//name=[name].[ext]保留原来的名字和后缀名. 在[name]前放一个[hash:8]-[name]名字前放一个hash值
			{test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
			{test: /\.js$/,use:'babel-loader',exclude:/node_modules/ },
			//这是配置babel来转换ES6语法
			//{test: /\.vue$/,use: 'vue-loader'}
			//处理vue文件的第三方loader
        ]
    }
}