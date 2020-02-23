const path =require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')  //自动更新
module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            //创建一个.css文件,然后import引入到main.js中,下载包,npm i ,配置rules
				//调用顺序从右到左.
			{test: /\.css$/,use: [
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader",
                  // options: {
                  //   modules: {
                  //     localIdentName: '[name]__[local]--[hash:base64:5]',
                  //        },
                  // }
                }
              ]
          },//配置处理.css文件的第三方loader规则转换
			{test: /\.less$/,use:['style-loader','css-loader','less-loader']},//这是处理less的第三方规则
      {test: /\.scss$/,
        use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
            options: {
                    modules: {
                      localIdentName: '[name]__[local]--[hash:base64:5]',
                         },
                  }
        },
        {
          loader: "sass-loader"
        },
        ]},  //这是处理.scss文件的第三方loader规则
			{test: /\.jpg|png|gif|bmp|jpeg$/,use:'url-loader?name=[name].[ext]'}, //处理图片路径的loader,只有一个url-loader所以不用数组
			//url-loader后边可以加参数,例如limit,给定的值是图片大小,单位是字节,如果参数值大于其大小,会转换成base64的.
			//name=[name].[ext]保留原来的名字和后缀名. 在[name]前放一个[hash:8]-[name]名字前放一个hash值
			{test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
			{test: /\.(js|jsx)$/,use:'babel-loader',exclude:/node_modules/ },
			//这是配置babel来转换ES6语法
			//{test: /\.vue$/,use: 'vue-loader'}
			//处理vue文件的第三方loader
        ]
    }
}