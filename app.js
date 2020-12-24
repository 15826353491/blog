

// 引入第三方模块 express
const express = require('express')
// 引入自定义的数据库连接模块
require('./model/connect')
// 引入第三方模块  获取参数
const bodyParser = require('body-parser')
// 引入第三方模块  获取请求存在cookies
const session = require('express-session')
// 引入第三方模块 模板引擎
const template = require('art-template')
// 引入第三方模块  时间格式模块
const dateformat = require('dateformat')
// 引入第三方模块  判断项目环境
const morgan = require('morgan')

// 引入系统模块path
const path = require('path')
// 引入自定义路由模块
const home = require('./route/home')
const admin = require('./route/admin')

const config = require('config')


// 开启服务器 
const app = express()


// 判断项目环境



// 设置静态资源文件夹
app.use(express.static(path.join(__dirname,'public')))

// 设置使用的模板
app.engine('art',require('express-art-template'))
// 设置模板路径
app.set('views',path.join(__dirname,'views'))
// 设置后缀
app.set('view engine','art')
// 向模板引入 时间格式模块
template.defaults.imports.dateformat = dateformat




// 如果 extended值为false 会使用系统模块 querystring 对请求参数解析
// extended : true 会使用第三方模块 qs 对请求参数解析
app.use(bodyParser.urlencoded({extended:false}))

// 获取请求信息 存在cookies
app.use(session({
				resave: false, //添加 resave 选项
				saveUninitialized: false, //添加 saveUninitialized 选项
				secret:'secret key',
				cookie:{
					// 保存一天
					// maxAge:5000
				}
				}))

// 拦截admin请求 判断session是否保存user信息 如果有可以跳转到user页面
app.use('/admin',require('./middleware/loginGuard.js'))


// 拦截home路由
app.use('/home',home)
// 拦截admin路由
app.use('/admin',admin)



// 处理错误中间件程序
app.use((err,req,res,next)=>{
	
	var params=[]
	
	for (let attr in err) {
		if(attr !=='path'){
			params.push(attr+'='+err[attr])
		}
	}
	res.redirect(`${err.path}?${params.join('&')}`)
})

// 页面未找到
app.use((req,res)=>{
	res.send('<h1 style="margin:200px auto;width:300px">NOT Found</h1>')
})



app.listen(3000,()=>console.log('服务器开启成功!'))


