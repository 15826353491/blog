
const {User} = require('../../model/user.js')

module.exports =async (req,res)=>{
	
	//设置全局属性控制按钮高亮
	req.app.locals.currentLink = 'user'
	
	//页码
	let page = req.query.page || 1
	// 每一页显示的数量
	let pagesize = 10
	// 总的数据条数
	let count =await User.countDocuments()
	// let count =await User.estimatedDocumentCount()
	// 总页数
	let total = Math.ceil(count/pagesize)
	// 查询开始的位置
	let start = (page-1)*pagesize
	const users =await User.find().limit(pagesize).skip(start)
	res.render('admin/user',{users,total,page,count})
}