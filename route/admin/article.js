
// 引入第三方模块 分页处理
const pagination = require('mongoose-sex-page')

const {Article} = require('../../model/article.js')

module.exports =async (req,res)=>{
	const page = req.query.page || 1
	//设置全局属性控制按钮高亮
	req.app.locals.currentLink = 'article'
	
	// let articles = await Article.find().populate('author').lean()
	// 分页
	let articles = await pagination(Article).page(page).size(2).populate('author').display().exec()
	// 将数据转为字符串再转为对象
	articles = JSON.stringify(articles)
	articles = JSON.parse(articles)
	
	// res.send(articles)
	res.render('admin/article',{articles})
}