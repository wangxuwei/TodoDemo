snow.dm.registerDao("tagtodo",(function(){
			
			var tagTodos = getTagTodos();
			
			var tagTodoDao = {
				
				get: function(objectType,id){
					var tagTodo = getTagTodoDataById(id);
					if (tagTodo){
						return $.extend({},tagTodo);
					}else{
						return null;
					}
				},		
				
				find: function(objectType,opts){
					var a = [];
					for (var i = 0; i < tagTodos.length; i++){
						var u = tagTodos[i];
						a.push($.extend({},u)); 
					}
					return a;
				},
				
				save: function(objectType,data){
					//if it is an update (assume that if there is an data.id, it exists)
					if (data.id){
						var idx = getIndexForTagTodoId(data.id);
						//this will support partial update
						tagTodos[idx] = $.extend(tagTodos[idx], data);
					}
					//if it is a create
					else{
						data.id = snow.util.uuid(17);
						var tagTodo = $.extend({},data);
						tagTodos.push(tagTodo);		
					}
					saveTagTodos();
					return tagTodoDao.get(objectType,data.id);
					
					
				},
				
				remove: function(objectType,id){
					var idx = getIndexForTagTodoId(id);
					if (idx != null) {
						snow.util.array.remove(tagTodos, idx);
						saveTagTodos();
					}
				}
			};
			
			function getTagTodoDataById(tagTodoId){
				var idx = getIndexForTagTodoId(tagTodoId);
				if (idx != null){
					return tagTodos[i];
				}else{
					return null;
				}
			}
			
			function getIndexForTagTodoId(tagTodoId){
				for (i = 0; i < tagTodos.length; i++){
					tagTodo = tagTodos[i];
					if (tagTodo.id == tagTodoId){
						return i;
					}
				}
				return null;
			}
			
			function saveTagTodos(){
				localStorage.tagTodos = JSON.stringify(tagTodos);
			}
			function getTagTodos(){
				var tagTodos = localStorage.tagTodos;
				if(tagTodos == null){
					tagTodos = new Array();
				}else{
					tagTodos = JSON.parse(tagTodos);
				}
				return tagTodos;
			}

			return tagTodoDao;
})());