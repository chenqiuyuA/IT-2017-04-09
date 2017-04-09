$(function(){				
				//轮播图的媒体查询
				function resize(){
					var s_width = $(window).width();
					var isSmall = s_width<768;
					$(".item").each(function(i,e){
						var $item = $(e);
						//注意：data的属性值获取最好还是用attr去获取。我发现用data不行
						var Src = $item.attr('data-image-xs');
						if(isSmall){
//							alert("小于768");
//							$item.append('<img class="imge" src="' + Src + '" alt="" />');
							$item.css("height","150px");
						}else{
//							alert("大于768");
//							$item.empty();
							$item.css("height","300px");						
						}
					})					
				}
				$(window).on('resize',resize).trigger('resize');
				
				
})
