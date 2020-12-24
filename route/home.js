

// 引入第三方模块express
const express = require('express')
// 创建一级路由
const home = express.Router()

// 二级路由

// 显示文章
home.get('/',require('./home/index.js'))
// 显示文章详情
home.get('/article',require('./home/article.js'))

// 获取评论信息 
home.post('/comment',require('./home/comment.js'))

module.exports = home