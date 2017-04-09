$(function() {
	
	showFirst(getQueryStringArgs().tag);
	//教师资源的导航
	$(".j-teach-nav li").click(function() {
		$(this).addClass("symbol").siblings().removeClass("symbol");
		$(".detail").removeClass("show");
		$(".detail").eq($(this).index()).addClass("show");
	});
	// 顶部导航栏
	$(".j-teach-nav  a").click(function() {
		$('.teach-nav .hWork').removeClass("symbol");
		$($('.teach-nav .hWork')[$(this).index()]).addClass("symbol");
		$(".detail").removeClass("show");
		$(".detail").eq($(this).index()).addClass("show");
	});	
});


// 分析查询字符串
function getQueryStringArgs() {
	// 取得查询字符串并去掉开头问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : " "),

		// 保存数据的对象
		args = {},

		// 取得每一项
		items = qs.length ? qs.split('&') : [],
		item = null,
		name = null,
		value = null,

		i = 0,
		len = items.length;

	// 逐个将每一项添加到args对象中
	for (i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		}
	}
	return args;
}

// 设置显示第几个区块
// 1.设置左侧的显示栏
// 2.设置右侧的显示框
function showFirst(tag) {
	$('.teach-nav .hWork').removeClass("symbol");
	$($('.teach-nav .hWork')[tag]).addClass("symbol");
	$(".detail").removeClass("show");
	$(".detail").eq(tag).addClass("show");
}