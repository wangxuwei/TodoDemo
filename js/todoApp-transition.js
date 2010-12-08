snow.ui.registerTransition("wipe",function(ctx){
	var $new = ctx.$element;
	
	var $parent = $(ctx.parent);
	var $old = $parent.children();
	if(ctx.data&&ctx.data.back){
		//if we have already some elements, then, do the animation
		if ($old.length > 0) {
			$old.animate({
				marginTop: "-300px",
				opacity: "0"
			}, 500, function(){
				$old.remove();
				
			});
		}
		
		$new.css({
			marginTop: "200px"
		});
		$parent.append($new);
		$new.animate({
			marginTop: "0px"
		});
	}else{
	//if we have already some elements, then, do the animation
		if ($old.length > 0) {
			$old.animate({
				marginTop: "300px",
				opacity: "0"
			}, 500, function(){
				$old.remove();
				
			});
		}
		
		$new.css({
			marginTop: "-200px"
		});
		$parent.append($new);
		$new.animate({
			marginTop: "0px"
		});
	}
			
});