/*
 * @Author: mingming
 * @Date:   2017-03-18 08:56:32
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-04 13:11:46
 */

'use strict';
$('#toregister').click(function(event) {
	// 验证并提交注册数据
	if (validateemail($('#useremail')) && validatemobile($('#phone')) && validateusername($('#username')) && validatepassword($('#userpassword')) && validatepassword2($('#userpassword'), $('#userpassword2')) && cantBeNone($('#truename'))) {
		var myTime = new Date().toLocaleString();
		// 检验验证码是否一致
		if (validatecode($('#identifyingCode'))) {
			// 获取用户信息
			$.ajax({
				type: "post",
				url: "data/login.json",
				data: {
					username: $('#useremail')[0].value,
					phone: $('#phone')[0].value,
					useremail: $('#username')[0].value,
					userpassword: $('#userpassword')[0].value,
					time: myTime
				},
				dataType: "text",
				success: function(data) {
					var data = JSON.parse(data);
					if (data.login == 1) {
						// 注册成功，标志已登录
						window.sessionStorage.coursePlatform_name = $('#username')[0].value;
						alert('注册成功！')
							// 回退到之前页面
						history.go(-1);

					} else {
						alert('评论失败！请与管理员联系');
					}
				},
				error: function(jqXHR) {
					alert('评论失败！请与管理员联系！');
				}
			});
		}

	}
});

// 发送验证码，绑定手机号 
// 验证码
var strNum;
$('#identifyingCodeBt').click(function(event) {
	if (validatemobile($('#phone'))) {
		$.ajax({
			type: "post",
			url: "data/register.json",
			data: {
				phone: $('#phone')[0].value
			},
			dataType: "text",
			success: function(data) {
				var data = JSON.parse(data);
				strNum = data.number;
			},
			error: function(jqXHR) {
				alert('验证码获取失败！请与管理员联系！');
			}
		});
	}
});
// 邮箱验证
function validateemail(email) {
	var value = email[0].value;
	if (value.length == 0) {
		alert('请输入邮箱！');
		email.focus();
		return false;
	}
	var myreg = /^\w+@\w+.\w+$/;
	if (!myreg.test(value)) {
		alert('请输入有效的邮箱！');
		email.focus();
		return false;
	}
	return true;
}
// 手机号验证
function validatemobile(mobile) {
	var value = mobile[0].value;
	if (value.length == 0) {
		alert('请输入手机号码！');
		mobile.focus();
		return false;
	}
	if (value.length != 11) {
		alert('请输入有效的手机号码！');
		mobile.focus();
		return false;
	}
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (!myreg.test(value)) {
		alert('请输入有效的手机号码！');
		mobile.focus();
		return false;
	} 
	return true;
}

// 验证用户名
function validateusername(username) {
	var value = username[0].value;
	if (value.length == 0) {
		alert('请输入用户名！');
		username.focus();
		return false;
	}
	var myreg = /^[a-zA-Z]\w{4,31}$/;
	if (!myreg.test(value)) {
		alert('请输入有效的用户名！以字母开头，5-32个字符（包含字母、数字和下划线）');
		username.focus();
		return false;
	}
	return true;
}

// 验证密码格式
function validatepassword(password) {
	var value = password[0].value;
	if (value.length == 0) {
		alert('请输入密码！');
		password.focus();
		return false;
	}
	var myreg = /^\w{6,32}$/;
	if (!myreg.test(value)) {
		alert('请输入有效的密码！6-32个字符');
		password.focus();
		return false;
	}
	return true;
}

// 验证两次密码输入是否一致
function validatepassword2(password, password2) {
	var value = password[0].value;
	var value2 = password2[0].value;
	if (value != value2) {
		alert('两次密码输入不一致！请重新输入！');
		password.focus();
		return false;
	}
	return true;
}

// 验证验证码是否一致
function validatecode(identifyingCode) {
	var value = identifyingCode[0].value;
	if (value.length == 0) {
		alert('请输入验证码！');
		identifyingCode.focus();
		return false;
	} else if (strNum != $('#identifyingCode')[0].value) {
		alert('验证码不正确！');
		return false;
	}
	return true;
}

// 姓名不能为空
function cantBeNone(itema) {
	var value = itema[0].value;
	if (value.length == 0) {
		alert('姓名不能为空！');
		itema.focus();
		return false;
	}
	return true;
}