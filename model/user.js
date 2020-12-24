
// 引入第三方模块 mongoose
const mongoose = require('mongoose')

// 引入第三方加密模块  bcryptjs
const bcryptjs = require('bcryptjs')

// 引入表单验证模块 joi
const Joi = require('joi')

// 创建集合规则
const userschema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:2,
		maxlength:20
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		unique:true,
		required:true
	},
	// 超级用户 admin 普通用户 normal
	role:{
		type:String,
		required:true
	},
	// 0启用 1禁用
	state:{
		type:Number,
		default:0
	}
})

// 应用集合规则
const User = mongoose.model('User',userschema)


async function createUser(){
	// 生成随机字符串
	const salt = await bcryptjs.genSalt(10)
	// 进行明文加密
	const pass = await bcryptjs.hash('123456',salt)
	await User.create({
			name:'zhangsan',
			email:'zhangsan@qq.com',
			password:pass,
			role:'admin',
			state:0,
	})
} 

 //createUser()

const validateUser =  form =>{
	const schema = Joi.object({
		name:Joi.string().min(2).max(20).required().error(new Error('用户名不符合规则')),
		email:Joi.string().email().required().error(new Error('邮箱不符合规则')),
		password:Joi.string().regex(/^\w{3,20}$/).required().error(new Error('密码不符合规则')),
		role:Joi.string().valid('admin','normal').required().error(new Error('角色不符合预选')),
		state:Joi.number().valid(0,1).required().error(new Error('状态不符合预选'))
	})
	
	return   schema.validateAsync(form)
}		
	

module.exports = {
	// es6 对象中 属性与属性值相同就简写
	// User:User
	User,
	validateUser
}