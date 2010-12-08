snow.dm.registerDao("tag",(function(){
			
			var tags = getTags();
			
			var tagDao = {
				
				get: function(objectType,id){
					var tag = getTagDataById(id);
					if (tag){
						return $.extend({},tag);
					}else{
						return null;
					}
				},		
				
				find: function(objectType,opts){
					var a = [];
					for (var i = 0; i < tags.length; i++){
						var u = tags[i];
						a.push($.extend({},u)); 
					}
					return a;
				},
				
				save: function(objectType,data){
					//if it is an update (assume that if there is an data.id, it exists)
					if (data.id){
						var idx = getIndexForTagId(data.id);
						//this will support partial update
						tags[idx] = $.extend(tags[idx], data);
					}
					//if it is a create
					else{
						data.id = snow.util.uuid(17);
						var tag = $.extend({},data);
						tags.push(tag);		
					}
					saveTags();
					return tagDao.get(objectType,data.id);
					
					
				},
				
				remove: function(objectType,id){
					var idx = getIndexForTagId(id);
					if (idx != null) {
						snow.util.array.remove(tags, idx);
						saveTags();
					}
				}
			};
			
			function getTagDataById(tagId){
				var idx = getIndexForTagId(tagId);
				if (idx != null){
					return tags[i];
				}else{
					return null;
				}
			}
			
			function getIndexForTagId(tagId){
				for (i = 0; i < tags.length; i++){
					tag = tags[i];
					if (tag.id == tagId){
						return i;
					}
				}
				return null;
			}
			
			function saveTags(){
				localStorage.tags = JSON.stringify(tags);
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

			return tagDao;
})());