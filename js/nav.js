$(function(){
		//导航（大屏幕）
		//导航字体和li背景的变化
			$(".navgar .navgar-nav li").mouseenter(function(){
				$(".navgar .navgar-nav .nav1").eq($(this).index()).css("background","url(img/top-sanjiao.png) bottom no-repeat");
				$(".nav-big li").eq($(this).index()).css("background","#e8f1f1");
//				alert($(this).index());
				$(".nav-big li").eq($(this).index()).children().css({"color":"#000","font-size":"18px"});
				$(".nav-big li").eq($(this).index()).children().mouseenter(function(){
					$(this).css({"color":"#005c6c"});
				});
				$(".nav-big li").eq($(this).index()).children().mouseleave(function(){
					$(this).css({"color":"#000"});
				})
			});
			$(".navgar .navgar-nav li").mouseleave(function(){
				$(".navgar .navgar-nav .nav1").css("background","none");
				$(".nav-big li").eq($(this).index()).css("background","none");	
				$(".nav-big li").eq($(this).index()).children().css({"color":"#9D9D9D","font-size":"16px"});
			});
			
			$(".nav-big li").mouseenter(function(){
				$(".navgar .navgar-nav .nav1").eq($(this).index()).css("background","url(img/top-sanjiao.png) bottom no-repeat");
				$(this).css("background","#e8f1f1");
				$(".nav-big li").eq($(this).index()).children().css({"color":"#000","font-size":"18px"});
				$(".nav-big li").eq($(this).index()).children().mouseenter(function(){
					$(this).css({"color":"#005c6c"});
				});
				$(".nav-big li").eq($(this).index()).children().mouseleave(function(){
					$(this).css({"color":"#000"});
				})
			});
			$(".nav-big li").mouseleave(function(){
				$(".navgar .navgar-nav .nav1").eq($(this).index()).css("background","none");
				$(this).css("background","none");
				$(".nav-big li").eq($(this).index()).children().css({"color":"#9D9D9D","font-size":"16px"});
			});

			
			$(".nav-top").mouseenter(function(event){
				$(".nav-big").slideDown();				
				event.stopPropagation();//阻止事件冒泡
			});
			$(".navgar").mouseleave(function(event){
				$(".nav-big").slideUp();
				event.stopPropagation();//阻止事件冒泡
			});		
			
			//导航置顶
			var topHeight = $(".top").height();
			$(window).scroll(function(){
				var doscrollTop = $(document).scrollTop();
				if(doscrollTop>=topHeight){
					//导航（大屏幕）
					$(".nav-top").css({
						"position":"fixed",
						"top":0
					});
					$(".nav-big").css({
						"position":"fixed",
						"top":$(".nav-top").height()
					});
					
					//导航（小屏幕）
					$(".navbar").css({
						"position":"fixed",
						"top":0
					});
				}else{
					//导航（大屏幕）
					$(".nav-top").css({
						"position":"static",
						"top":topHeight
					});
					$(".nav-big").css({
						"position":"absolute",
						"top":$(".nav-top").height()
					});
					
					//导航（小屏幕）
					$(".navbar").css({
						"position":"static"						
					});
				}
			})
})