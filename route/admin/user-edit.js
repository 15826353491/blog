
const {User}= require('../../model/user.js')

module.exports =async (req,res)=>{
	
	//设置全局属性控制按钮高亮
	req.app.locals.currentLink = 'user'
	
	const {message,id} = req.query
	if(id){
		// 修改用户信息
		const user = await User.findOne({_id:id})	
		res.render('admin/user-edit',{message,user,link:`/admin/user-modify?id=${id}`,button:'修改'})
	}
	else{
		//添加用户信息
		res.render('admin/user-edit',{message,link:'/admin/user-edit',button:'添加'})
	}
	
}