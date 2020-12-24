

const {User,validateUser} = require('../../model/user.js')

// 引入第三方模块 加密模块 
const bcryptjs = require('bcryptjs')

module.exports = async (req,res,next)=>{

	try{
		await validateUser(req.body)
	}
	catch(e){
		return 	next({path:'/admin/user-edit',message:e.message})
	}
	
	const user =await User.findOne({email:req.body.email})
	if(user){
		// return	res.redirect(`/admin/user-edit?message=该邮箱已被注册`)
		return next({path:'/admin/user-edit',message:'该邮箱已被注册'})
	}else{
		const salt =await bcryptjs.genSalt(10)
		const pass = await bcryptjs.hash(req.body.password,salt)
		req.body.password = pass
		await User.create(req.body)
		res.redirect('/admin/user')
	}
}