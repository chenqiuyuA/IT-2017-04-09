/*
 * @Author: mingming
 * @Date:   2017-03-23 21:38:49
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-04 14:10:03
 */

'use strict';

$(function() {
	// 记录开始时间
	var startTime = new Date().toLocaleString();
	// 记录条数
	var flog = 0;
	// 答案
	var answer = new Array();
	// 检测是否已登录
	var userName = window.sessionStorage.coursePlatform_name;
	if (window.sessionStorage.coursePlatform_login != 'success') {
		alert('请登录后考试。');
		location.href = './login.html';

	} else {
		// 获取题目
		getQuetion();
	}


	// 判断选择的正确与否
	function showAnswer() {
		// 获取题目编号
		var num = parseInt($($(this).parent().parent().parent().find('span')[0]).text());
		if (answer[num - 1] == $(this)[0].value) {
			$($(this).parent().parent().parent().find('.glyphicon')[0]).removeClass('glyphicon-remove').addClass('glyphicon-ok');
		} else {
			$($(this).parent().parent().parent().find('.glyphicon')[0]).removeClass('glyphicon-ok').addClass('glyphicon-remove');
		}
		$($(this).parent().parent().parent().find('.glyphicon')[0]).html('正确答案：' + answer[num - 1] + '    你的答案：' + $(this)[0].value);
	}


	function getQuetion(event) {
		// 获取题目
		$.ajax({
			type: "get",
			url: "data/exercise.json",
			data: {
				// 题目类型为2
				// 获取6道题目
				type: 2,
				length: 6
			},
			dataType: "text",
			success: function(data) {

				var data = JSON.parse(data);
				var question1 = data.question1;

				// 将选择题渲染到页面
				var tag = '';
				for (var i = 0; i < question1.length; i++) {
					var question = question1[i];
					var Bt = '<div class="change"><div class="changeradio"><input type="radio" name="que' + i + '" value="A" >A、' + question.A + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="B" >B、' + question.B + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="C" >C、' + question.C + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="D" >D、' + question.D + '</div></div>';

					// 做到倒数第二条的时候，再次加载题目
					if (i >= (question1.length - 2)) {
						Bt = '<div class="change getQuetion"><div class="changeradio"><input type="radio" name="que' + i + '" value="A" >A、' + question.A + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="B" >B、' + question.B + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="C" >C、' + question.C + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="D" >D、' + question.D + '</div></div>';
					}

					tag += '<div class="question"><div class="questionTitle"><p><span>' + (flog + 1) + '、</span>' + question.title + '<span class="glyphicon"></span></p></div>' + Bt + '</div>';
					answer.push(question.answer);
					flog++;
				}

				$('.getQuetion').removeClass('getQuetion');
				$('#question1Box').append(tag);
				$("input").change(showAnswer);
				$('.getQuetion').click(getQuetion);

			},
			error: function(jqXHR) {
				alert('题目获取失败！请与管理员联系！');
			}
		});
	}


	// 计时器
	var a = 1;
	var startTest = setInterval(function() {
		$('#time').html(formatSeconds(a));
		a++;
	}, 1000);

	function formatSeconds(value) {
		var theTime = parseInt(value); // 秒
		var theTime1 = 0; // 分
		var theTime2 = 0; // 小时
		if (theTime > 60) {
			theTime1 = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (theTime1 > 60) {
				theTime2 = parseInt(theTime1 / 60);
				theTime1 = parseInt(theTime1 % 60);
			}
		}
		var result = "" + parseInt(theTime) + "秒";
		if (theTime1 > 0) {
			result = "" + parseInt(theTime1) + "分" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + "小时" + result;
		}
		return result;
	}


	// 退出刷题页面前，提交用户名、开始时间、结束时间、正确率
	$('#quitBt').click(function() {
		// 正确率
		var userAccuracy = $('.glyphicon-ok').length / ($('.glyphicon-ok').length + $('.glyphicon-remove').length);
		$.ajax({
			type: "POST",
			url: "data/test1.json",
			data: {
				userName: userName,
				startTime: startTime,
				endTime: new Date().toLocaleString(),
				userAccuracy: userAccuracy
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);
				if (data.success != true) {
					alert('信息提交发生错误！');
				}
				// 回退到之前的页面
				history.go(-1);
			},
			error: function(jqXHR) {
				alert('信息提交发生错误！');
			}
		});
	});

});