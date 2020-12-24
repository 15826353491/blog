
// 通过formidable解析表单
const formidable = require('formidable')
const path =require('path')

const {Article} = require('../../model/article.js')

module.exports =async (req,res)=>{
	const {id} =req.query
	
	// 创建表单解析对象
	const form = new formidable.IncomingForm()
	// 设置文件上传路径
	form.uploadDir = path.join(__dirname,'../../public/uploads')
	//保留上传文件的后缀名
	form.keepExtensions = true
	// 解析表单
	form.parse(req,async (err,fields,files)=>{
		// err 解析失败会返回错误对象 ，解析成功会返回null
		// fields 保存的普通请求的参数{title:xxx,authod:xxx}
		// files 保存上传文件
		
		await Article.updateOne({_id:id},{
					title:fields.title,
					author:fields.author,
					publishDate:fields.publishDate,
					cover:files.cover.path.split('public')[1],
					content:fields.content
					})
		res.redirect('/admin/article')
	})
	
	
}