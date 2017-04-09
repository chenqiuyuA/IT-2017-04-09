$(function(){
	getData();
	function getData(){		
		$.ajax({
			type: 'GET',
			url: './data/partA-part1-partInA.json',
			dataType: 'json',			        			        			   
			success: function(data){
						var htme=htmll(data);
						console.log(data);
						$('.part1 .partInA').append(htme);		
			},
			error: function(xhr, type){
						alert('Ajax error!')
			}
		})
		$.ajax({
			type: 'GET',
			url: './data/partA-part2.json',
			dataType: 'json',			        			        			   
			success: function(data){
						var htme2=htmll2(data);
						console.log(data);	
						$('.part2 .partInA').append(htme2);		
			},
			error: function(xhr, type){
						alert('Ajax error!')
			}
		})
		$.ajax({
			type: 'GET',
			url: './data/partA-part3-partInA.json',
			dataType: 'json',			        			        			   
			success: function(data){
						var htme3=htmll3(data);
						console.log(data);	
						$('.part3 .partInA').append(htme3);		
			},
			error: function(xhr, type){
						alert('Ajax error!')
			}
		})
	}
	//ajax实现“partA的part1中partInA”部分
	function htmll(data){
		var html='';
		for(i in data){															
			html=html+'<div class="detailA">'
				+'<div class="detailA-top">'
				+'<div class="itNews">IT新闻</div>'
				+'<div class="date" value="date">'+data[i].datee+'</div></div>'
				+'<div class="detailA-body"><div class="img"><img src="'+data[i].img+'"/></div>'
				+'<div class="word"><h5>'+data[i].newsTitle+'</h5>'
				+'<p>'+data[i].newsHead+'<a href="">[详情]</a></p></div></div></div>';													
		}
		return html;				
	}
	function htmll2(data){
		var html='';
		for(i in data){																																	
			html=html+'<ul><li><a href="">'+data[i].resource+'</a>'
				+'<span>'+data[i].uploadTime+'</span></li></ul>'
		}
		return html;				
	}
	
	//ajax实现“partA的part3中partInA”部分
	function htmll3(data){
		var html='';
		for(i in data){															
			html=html+'<div class="detailA">'
				+'<div class="detailA-top">'
				+'<div class="itNews">JAVA动态</div>'
				+'<div class="date" value="date">'+data[i].datee+'</div></div>'
				+'<div class="detailA-body"><div class="img"><img src="'+data[i].img+'"/></div>'
				+'<div class="word"><h5>'+data[i].newsTitle+'</h5>'
				+'<p>'+data[i].newsHead+'<a href="">[详情]</a></p></div></div></div>';													
		}
		return html;				
	}
})
