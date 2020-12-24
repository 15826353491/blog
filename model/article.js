
const mongoose = require('mongoose')

//创建文章集合规则

const articleSchema = new mongoose.Schema({
	title:{
		type:String,
		minlength:4,
		maxlength:20,
		required:[true,'文章标题是必填项']
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	publishDate:{
		type:Date,
		default:Date.now
	},
	cover:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	}
})

const Article = mongoose.model('Article',articleSchema)

module.exports = {
	Article
}