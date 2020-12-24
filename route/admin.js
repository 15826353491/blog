
// 引入第三方模块express
const express = require('express')
// 创建一级路由
const admin = express.Router()


// 二级路由 用户管理界面和文章管理界面

// 接收get请求 显示登录页面
admin.get('/login',require('./admin/loginPage.js'))

// 接收post请求 获取登录页面post请求以及表单参数 
admin.post('/login',require('./admin/login.js'))

// 退出登录
admin.get('/logout',require('./admin/logout.js'))


// 显示用户信息界面
admin.get('/user',require('./admin/userPage.js'))

// 显示新增用户界面 填写表单信息
admin.get('/user-edit',require('./admin/user-edit.js'))

// 添加新增用户信息 获取提交信息
admin.post('/user-edit',require('./admin/user-edit-fn.js'))

// 修改用户信息 获取修改后的提交信息
admin.post('/user-modify',require('./admin/user-modify.js'))

// 删除用户信息 
admin.get('/user-delete',require('./admin/user-delete.js'))


// 显示文章管理界面 
admin.get('/article',require('./admin/article.js'))

// 显示文章添加界面 
admin.get('/article-edit',require('./admin/article-edit.js'))

// 添加文章信息
admin.post('/article-add',require('./admin/article-add.js'))

// 删除文章信息
admin.get('/article-delete',require('./admin/article-delete.js'))

// 修改文章信息
admin.post('/article-modify',require('./admin/article-modify.js'))

module.exports = admin