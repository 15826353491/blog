
const {User} = require('../../model/user.js')

module.exports =async (req,res)=>{
	const id = req.query.id
	await User.findOneAndDelete({_id:id})
	res.redirect('/admin/user')
}