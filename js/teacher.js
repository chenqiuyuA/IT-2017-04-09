/*
 * @Author: mingming
 * @Date:   2017-03-30 13:06:12
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-03 20:38:14
 */

'use strict';
$(function() {
	$.ajax({
		type: "get",
		url: "data/teacher.json",
		dataType: "text",
		success: function(data) {
			var data = JSON.parse(data);
			console.log(data);
			var teacher = data.teacher;
			console.log(teacher.length);
			var tag = '';
			for (var i = 0; i < teacher.length; i++) {
				var team = teacher[i];
				console.log(team);
				tag += '<div class="teacherBox clearfix"><div class="leftBox"><img src="' +team.TPicturePath+'" alt="'+team.TName+'"></div><div class="boxRight"><p><span>姓名：</span>'+team.TName+'</p><p>'+team.TLevel+'</p><p><span>特长：</span>'+team.TInterested+'</p><p><span>关于：</span>'+team.TAbout+'</p></div></div>';
			}
			$('#teacherIteam').append(tag);
		},
		error: function(jqXHR) {
			alert('教师信息获取失败！请与管理员联系！');
		}
	});
});