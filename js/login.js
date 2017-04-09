/*
 * @Author: mingming
 * @Date:   2017-03-18 00:12:32
 * @Last Modified by:   mingming
 * @Last Modified time: 2017-04-01 20:50:44
 */

(function() {
	'use strict';
	//	会话sessionStorage
	var Util = (function() {
		var prefix = 'coursePlatform_';
		var StorageGetter = function(key) {
			return sessionStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key, val) {
			return sessionStorage.setItem(prefix + key, val);
		}
		return {
			StorageGetter: StorageGetter,
			StorageSetter: StorageSetter
		}
	})();

	function main() {
		$('#toLogin').click(function() {
			//验证用户名密码
			var username = $('#username').val();
			var userPassword = $('#userPassword').val();
			$.ajax({
				type: "POST",
				url: "data/login.json",
				data: {
					username: username,
					userPassword: userPassword
				},
				dataType: "text",
				success: function(data) {
					var data = JSON.parse(data);
					// 用户名、密码验证正确
					if (data.login == 1) {
						// 记录用户名以及标志登录成功
						Util.StorageSetter('login', 'success');
						Util.StorageSetter('name', username);

						// 登陆成功，回退到之前页面
						history.go(-1);

					}
					// 用户名、密码验证不正确
					else {
						alert('用户名或密码不正确！');
					}
				},
				error: function(jqXHR) {
					alert('失败');
					console.log("发生错误：" + jqXHR.status);
				}
			});
		});



	}
	return main();
})();