'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 配置
module.exports = {
	// 入口
	entry:{
		//main是默认入口,也可以是多入口
		main:'./src/main.js'
	},
	// 出口
	output:{
		//指定产出资源路径js文件,最好是绝对路径
		path:path.join(__dirname,'dist'),
		filename:'build.js'
	},
	module:{
		loaders:[
			//css文件
			{
				test:/\.css$/,
				//顺序是反过来的2!1 
				loader:'style-loader!css-loader!autoprefixer-loader'
			},
			//less文件
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			//less文件
			{
				test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
				loader:'url-loader',
				options:{
					limit:4096,//4096字节以上生成文件，否则base6
					name:'[name].[ext]'//内置提供的，因为本身是先读这个文件
				}
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				// options:{	如果多次使用babel-loader就需要多次options
				// 	presets:['es2015'],//关键字
				// 	plugins:['transform-runtime']//函数
				// }
			},
			// 解析vue-preview的es6代码
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                // options: {   建议使用.babelrc文件，在当前根目录就可以了
                //     presets: ['es2015'], //关键字
                //     plugins: ['transform-runtime'], //函数
                // }
            },
			{
				test:/\.vue$/,
				loader:'vue-loader'
			}
		]
	},
	//插件，插件的执行顺序是依次执行的
	plugins:[
		//将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
		new htmlWebpackPlugin({
			template:'./src/index.html'
		})
	]
}