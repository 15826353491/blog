
const {Article} = require('../../model/article.js')

// 分页
const pagination = require('mongoose-sex-page')

module.exports =async (req,res)=>{
	
	const page = req.query.page || 1
	
  	// const articles = await Article.find().populate('author').lean()
	let articles = await pagination(Article).populate('author').page(page).size(4).display().exec()
	articles = JSON.stringify(articles)
	articles = JSON.parse(articles)
	
	// res.send(articles)
	res.render('home/default',{articles})
}