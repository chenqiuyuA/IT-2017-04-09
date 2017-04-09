/*
 * @Author: mingming
 * @Date:   2017-03-21 15:39:32
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-04 13:38:47
 */

'use strict';

$(function() {
	// 检测是否已登录
	var userName = window.sessionStorage.coursePlatform_name;
	if (window.sessionStorage.coursePlatform_login != 'success') {
		alert('请登录后考试。');
		location.href = './login.html';

	} else {
		// 获取题目
		$.ajax({
			type: "get",
			url: "data/test.json",
			data: {
				// 提示考试类型为1
				test: 1
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);


				var question1 = data.question1;
				var question2 = data.question2;

				// 将选择题渲染到页面
				var tag = '';
				for (var i = 0; i < question1.length; i++) {
					var question = question1[i];
					var Bt = '<div class="change"><div class="changeradio"><input type="radio" name="que' + i + '" value="A" >A、' + question.A + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="B" >B、' + question.B + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="C" >C、' + question.C + '</div><div class="changeradio"><input type="radio" name="que' + i + '" value="D" >D、' + question.D + '</div></div>';
					tag += '<div class="question"><div class="questionTitle"><span>' + (i + 1) + '、</span><p>' + question.title + '</p></div>' + Bt + '</div>';
				}
				$('#question1Box').html(tag);


				// 将简答题渲染到页面
				tag = '';
				for (var i = 0; i < question2.length; i++) {
					var question = question2[i];
					tag += '<div class="question2"><p><span>' + (i + 1) + '、</span>' + question.title + '</p><div class="answer"><textarea name=""></textarea></div></div>';
				}
				$('#question2Box').html(tag);

				$("input").change(showAnswer1);
				$('textarea').change(showAnswer2);

			},
			error: function(jqXHR) {
				alert('题目获取失败！请与管理员联系！');
			}
		});
	}

	// 尾部显示全部答案
	function showAnswer1() {
		var tag = '';
		// 获取选择题答案
		$('.change').each(function(index, obj) {
			if ($(obj).find('input:checked').val() != null) {
				tag += '<p><span>' + (index + 1) + '</span>' + $(obj).find('input:checked').val() + '</p>';
			} else {
				tag += '</p><span>' + (index + 1) + '</span>未答<p>';
			}

		});

		$('#answer1').html(tag);

	}

	function showAnswer2() {
		var tag = '';
		// 获取简答题答案
		$('.answer textarea').each(function(index, obj) {
			tag += '<p><span>' + (index + 1) + '</span>' + obj.value + '</p>';
		});
		$('#answer2').html(tag);

	}


	// 计时器
	var a = 0;
	var b = 0;
	var startTest = setInterval(function() {
		if (b > 100) {
			clearInterval(startTest);
			// 自动提交答案
			$('#toSendAnswer').trigger('click')
			alert('考试时间结束！已自动提交答案！');
		} else if ((a % 72) == 0 && (a != 0)) {
			b++;
			$('#progress-test-bar').css('width', (a / 72) + '%');
			$('#progress-test-bar').html((a / 72) + '%');
		}
		a++;
		$('#lossTime').html(formatSeconds(a));
	}, 1000);



	// 将秒数转换为时分秒
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


	// 提交答案
	var answer1 = new Array();
	var answer2 = new Array();
	$('#toSendAnswer').click(toSendAnswer);

	function toSendAnswer() {
		// 获取选择题答案
		$('.change').each(function(index, obj) {
			answer1.push($(obj).find('input:checked').val());
		});

		// 获取简答题答案
		$('.answer textarea').each(function(index, obj) {
			answer2.push(obj.value);
		});

		$.ajax({
			type: "POST",
			url: "data/test1.json",
			data: {
				userName: userName,
				time:new Date().toLocaleString( ),
				doneTime:$('#lossTime').html(),
				answer1: answer1,
				answer2: answer2
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);
				if (data.success == true) {
					alert('答案提交成功！您本次考试的成绩为'+data.grade);

				} else {
					alert('答案提交失败！请与管理员联系！');
				}
			},
			error: function(jqXHR) {
				alert('答案提交失败！请与管理员联系！');
			}
		});
	}

});