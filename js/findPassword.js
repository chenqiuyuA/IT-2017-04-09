/*
 * @Author: mingming
 * @Date:   2017-03-19 15:00:50
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-04 13:09:29
 */


$(function() {
	$('.containerpassword .nextContainer').click(function(event) {
		var num = $(this).data('contianer-num');
		if (num == 0) {
			if (validatemobile($('#phone')) != false) {
				// 查找邮箱
				$.ajax({
					type: "post",
					url: "data/findPassword.json",
					data: {
						phone: $('#phone')[0].value
					},
					dataType: "text",
					success: function(data) {
						var data = JSON.parse(data);
						$('#emailChange').html(data.email);
					},
					error: function(jqXHR) {
						alert('邮箱信息获取失败！请与管理员联系！');
					}
				});

				nextContainer(num);
			}
		} else if (num == 1) {
			// 验证码
			if (validatemobile($('#phone')) != false && strNum == $('#identifyingCode')[0].value) {
				nextContainer(num);
			} else {
				alert('验证码不正确!');
			}

		} else {

			if (validatepassword($('#userpassword')) != false) {
				if (validatepassword2($('#userpassword'), $('#userpassword2')) != false) {
					// 提交密码信息
					$.ajax({
						type: "post",
						url: "data/findPassword2.json",
						data: {
							phone: $('#phone')[0].value,
							newPassword:$('#userpassword')[0].value
						},
						dataType: "text",
						success: function(data) {
							var data = JSON.parse(data);
							if (data.flog=='success') {
								alert('密码修改成功!');
								location.href = './login.html';
							}else{
								alert("密码修改失败！请与管理员联系！")
							}
						},
						error: function(jqXHR) {
							alert('邮箱信息获取失败！请与管理员联系！');
						}
					});

				}
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



});

function nextContainer(num) {
	$($('.containerpassword')[num]).addClass('hidden');
	$($('.containerpassword')[num + 1]).removeClass('hidden');
	$('.title span').removeClass('new');
	$($('.title span')[num + 1]).addClass('new');
}