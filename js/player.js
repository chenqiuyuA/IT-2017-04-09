/*
 * @Author: mingming
 * @Date:   2017-03-20 12:59:51
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-03 19:10:10
 */

'use strict';
$(function() {


	// 获取用户名（检测用户是否是登录状态）
	var username = window.sessionStorage.coursePlatform_name;
	if (window.sessionStorage.coursePlatform_login == 'success') {
		$('#nickname').html('<p>' + username + '</p>');
		// 发送课程id，获取相关课程的全部评论
		$.ajax({
			type: "post",
			url: "data/play.json",
			data: {
				courseId: 2
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);
				var comment = data.comment;
				var tag = '';
				for (var i = 0; i < comment.length; i++) {
					var item = comment[i];
					tag += '<div class="oneComment"><p>' + comment[i].username + '</p><span>' + comment[i].comment + '</span><p class="time">' + comment[i].time + '</p></div>';
				}
				$($('.commentShow')[0]).html(tag);
			},
			error: function(jqXHR) {
				alert('课程评论获取失败！请与管理员联系！');
			}
		});
	} else {
		alert('请登录后观看视频。');
		location.href = './login.html';
	}


	// 实现点击视频播放暂停
	$('#js-videoBox').click(function() {
		if (this.paused) {
			$(this).trigger('play');
		} else {
			$(this).trigger('pause');
		}
	});

	// 实现点击评论的功能
	$('#commentBt').click(function() {
		var myTime = new Date().toLocaleString();
		// 获取当前用户的评论
		var comment = $('#usercomment')[0].value;
		$.ajax({
			type: "post",
			url: "data/login.json",
			data: {
				username: username,
				time: myTime,
				comment: comment
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);
				if (data.login == 1) {
					// 评论成功，加载当前评论到页面
					$($('.commentShow')[0]).html('<div class="oneComment"><p>' + username + '</p><span>' + comment + '</span><p class="time"></p></div>' + $($('.commentShow')[0]).html());
				} else {
					alert('评论失败！请与管理员联系');
				}
			},
			error: function(jqXHR) {
				alert('评论失败！请与管理员联系！');
			}
		});
	});

	// 回退到之前的列表页
	$('#goBack').click(function(event) {
		history.go(-1);
	});
});