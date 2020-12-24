		function serializeToJson(form){
				var result = {}
				//[{name:'email',value:'zhangsan@qq.com'}]
				var f = $(form).serializeArray()
				f.forEach(item=>{
					result[item.name] = item.value
				})
					return result	
			}