
// 引入第三方模块 mongoose
const mongoose = require('mongoose')


// 创建数据库连接
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true ,useUnifiedTopology: true ,  useCreateIndex: true  } )
		.then(res=>console.log('数据库连接成功!'))
		.catch(res=>console.log('数据库连接失败!'))