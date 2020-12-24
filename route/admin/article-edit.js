
const {Article} = require('../../model/article.js')

module.exports =async (req,res)=>{
	const {id} = req.query
	
	if(id){
		const articles = await Article.findOne({_id:id})
		// res.send(articles)
		res.render('admin/article-edit',{articles,link:`/admin/article-modify?id=${id}`,buttonName:'修改'})
	}else{	
		res.render('admin/article-edit',{link:"/admin/article-add",})
	}
	
}