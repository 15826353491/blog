
const {User} = require('../../model/user.js')
const bcryptjs = require('bcryptjs')
module.exports =async (req,res,next)=>{
	const id = req.query.id 
	const {name,email,password,role,state} = req.body
	
	const user = await User.findOne({_id:id})
	const isValid = await bcryptjs.compare(password,user.password)
	
	if (isValid) {
		await User.updateOne({_id:id},{name:name,email:email,role:role,state:state})
		res.redirect('/admin/user')
	} else{
	     next({path:'/admin/user-edit',id:id,message:'密码比对失败，不能修改用户信息'})	
	}
	
	
}