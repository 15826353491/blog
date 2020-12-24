
const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
	uid:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	aid:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	time:{
		type:Date
	},
	content:{
		type:String
	}
})

const Comment = mongoose.model('Comment',commentschema)


module.exports = {Comment}

