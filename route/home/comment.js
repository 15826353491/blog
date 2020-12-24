
const {Comment} = require('../../model/comment.js')

module.exports =async (req,res)=>{
	const {content,uid,aid} = req.body
	
	
	await Comment.create({
		uid:uid,
		aid:aid,
		content:content,
		time:new Date()
	})
	
	res.redirect('/home/article?id='+aid)
}