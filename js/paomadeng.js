$(function(){
	//简易轮播图
//			getData();
			var doscroll = document.getElementById('scroll');
			var partInA = doscroll.children[0];
			var num = 0;//控制顶部的值 top
			var timer = null;//加个定时器
			timer = setInterval(autoPlay,10);//加个定时器
			function autoPlay(){
				num--;
				// if(num<=-1800){			
				// 	ul.style.left = 0;
				// 	num = 0;
				// }
				// else
				// 	ul.style.left = num + "px";
				//上面注释的可以简写为以下
				num<=-540?num=0:num;
				partInA.style.top = num + "px";
			}
			doscroll.onmouseover = function(){
				clearInterval(timer);
			}
			doscroll.onmouseout = function(){
				timer = setInterval(autoPlay,10);
			}
//			getData();
})
