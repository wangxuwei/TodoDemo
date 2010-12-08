
snow.dm.registerDao("todo",(function(){
			
			var todos = getTodos();
			
			var todoDao = {
				
				get: function(objectType,id){
					var todo = getTodoDataById(id);
					if (todo){
						var tagTodos = getTagTodos();
						var tags = getTags();
						var t = todo;
						var todoTags = [];
						for (var j = 0; j < tagTodos.length; j++){
							var u = tagTodos[j];
							if(u.todoId == t.id){
								for(var k = 0; k<tags.length;k++){
									var s = tags[k];
									s.tagTodoId = u.id;
									if(u.tagId == s.id){
										todoTags.push($.extend({},s)); 
									}
								}
							}
						}
						todo.tags = todoTags;
						return $.extend({},todo);
					}else{
						return null;
					}
				},		
				
				find: function(objectType,opts){
					var a = [];
					var tagTodos = getTagTodos();
					var tags = getTags();
					for (var i = 0; i < todos.length; i++){
						var t = todos[i];
						var todoTags = [];
						for (var j = 0; j < tagTodos.length; j++){
							var u = tagTodos[j];
							if(u.todoId == t.id){
								for(var k = 0; k<tags.length;k++){
								    var s = tags[k];
									s.tagTodoId = u.id;
									if(u.tagId == s.id){
										todoTags.push($.extend({},s)); 
									}
								}
							}
						}
						t.tags = todoTags;
						a.push($.extend({},t)); 
					}
					return a;
				},
				
				save: function(objectType,data){
					//if it is an update (assume that if there is an data.id, it exists)
					if (data.id){
						var idx = getIndexForTodoId(data.id);
						//this will support partial update
						todos[idx] = $.extend(todos[idx], data);
					}
					//if it is a create
					else{
						data.id = snow.util.uuid(17);
						var todo = $.extend({},data);
						todos.push(todo);		
					}
					saveTodos();
					return todoDao.get(objectType,data.id);
					
					
				},
				
				remove: function(objectType,id){
					var idx = getIndexForTodoId(id);
					if (idx != null) {
						snow.util.array.remove(todos, idx);
						saveTodos();
					}
				}
			};
			
			function getTodoDataById(todoId){
				var idx = getIndexForTodoId(todoId);
				if (idx != null){
					return todos[i];
				}else{
					return null;
				}
			}
			
			function getIndexForTodoId(todoId){
				for (i = 0; i < todos.length; i++){
					todo = todos[i];
					if (todo.id == todoId){
						return i;
					}
				}
				return null;
			}
			
			function saveTodos(){
				localStorage.todos = JSON.stringify(todos);
			}
			function getTodos(){
				var todos = localStorage.todos;
				if(todos == null){
					todos = new Array();
				}else{
					todos = JSON.parse(todos);
				}
				return todos;
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
			function getTags(){
				var tags = localStorage.tags;
				if(tags == null){
					tags = new Array();
				}else{
					tags = JSON.parse(tags);
				}
				return tags;
			}
			return todoDao;
		})());