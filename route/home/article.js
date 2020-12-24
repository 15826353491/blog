
const {Article} = require('../../model/article.js')

const {Comment} = require('../../model/comment.js')

module.exports =async (req,res)=>{
	// 文章id
	const id = req.query.id
	const articles = await Article.findOne({_id:id}).populate('author').lean()
	const comments = await Comment.find({aid:id}).populate('uid').lean()
	
	res.render('home/article',{articles,comments})
	// res.send(comments)
}