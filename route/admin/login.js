
// 引入第三方加密模块
const bcryptjs = require('bcryptjs')
// 使用对象解构接收user集合
const {User} = require('../../model/user.js')

module.exports = async (req,res)=>{
	let {email,password} = req.body
	
	// 表单验证
	if(email.trim().length == 0 || password.trim().length == 0){
		// res.status(400).send('<h4>邮箱地址或密码错误</h4>')
		res.status(400).render('admin/error',{
			message:'邮箱地址或密码错误'
			})
	}
	
	// 判断数据库中是否有该邮箱
	const user =await User.findOne({email})
	if(user){
		let isValid = await bcryptjs.compare(password,user.password)
		// 判断密码
		if(isValid){
			req.session.role = user.role
			req.session.name = user.name
			// 将数据库获取来的数据存储在在app.locals.userInfo
			req.app.locals.userInfo = user
			if (user.role == 'admin') {
				// 重定向到后台管理界面
				res.redirect('/admin/user')
			} else{
				// 重定向到前端显示页面
				res.redirect('/home')
			}
			
			
		}else{
			res.status(400).render('admin/error',{
				message:'邮箱地址或密码错误'
				})
		}
	}else{
		res.status(400).render('admin/error',{
			message:'邮箱地址或密码错误'
			})
	}
}

