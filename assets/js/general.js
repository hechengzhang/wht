$('body').ready(function(){
	commonList(); // 常用链接
	provinceList(); // 省份列表
	searchEvent(); // 搜索
	
	$('.choose-school').click(function(){
		$('.choose-school-wapper').fadeIn();
	});
});

function searchEvent() {
	$('#choosed-search').text($('.search-ul li.current').text()); // 获取默认搜索引擎
	searchEngineEvent(); // 搜索引擎事件
	
	// 下拉菜单事件
	$('body').on('click',function(){
		if ($('.search-ul').hasClass('open')) {
			$('.search-ul').removeClass('open');
			$('.search-ul').slideUp();
		}
	});
	
	// 下拉菜单事件
	$('#choosed-search').click(function(event){ 
		event.stopPropagation(); // 禁止冒泡
		$('.search-ul').toggleClass('open'); // 增加 .open 用来判断点击事件
		$('.search-ul').slideToggle(); // 打开或收起下拉选项
	});
	
	// 搜索引擎切换
	$('.search-ul').on('click','li',function(){
		$(this).addClass('current').siblings('.current').removeClass('current');
		$('#choosed-search').text($(this).text()); // 显示已选搜索引擎文本
		searchEngineEvent(); // 搜索引擎事件
	});
	
	// 搜索按钮
	$('#search-btn').click(function(){
		if ($('.search-tips').length == 0) { // 是否有搜索提示框
			if ($('#search').val() == '') { // 搜索框是否为空，为空则显示提示框
				$('.search-input').append(
					'<div class="search-tips">'
						+'<span>您还没有输入任何内容噢，请输入后重新尝试！</span>'
					+'</div>'
				);
				$('.search-tips').fadeIn().css('margin-bottom','-30px'); // 提示框效果
			}
		} else{
			if ($('#search').val() == '') {// 判断搜索框是否为空
				return; // 为空返回
			} else {
				// 不为空则删除提示框
				$('.search-tips').fadeOut('fast',function(){
					$('.search-tips').remove();
				});
			}
		}
	});
}

function searchEngineEvent() {
	if ($('#baidu').hasClass('current')) {
		$('#search-form').attr('action','http://www.baidu.com/baidu').removeAttr('method','get');
		$('#search').attr('name','word');
	} else if ($('#google').hasClass('current')) {
		$('#search-form').attr({'action':'https://www.google.com.hk/search','method':'get'});
		$('#search').attr('name','q');
	} else if ($('#taobao').hasClass('current')) {
		$('#search-form').attr('action','https://s.taobao.com/search').removeAttr('method','get');
		$('#search').attr('name','q');
	}
}

function provinceList() {
	$('.chooose-container .list').on('click','li',function(){
		$(this).addClass('current').siblings('.current').removeClass('current');
	});
	
	$('.chooose-container .icon-close').click(function(){
		$('.choose-school-wapper').fadeOut();
	});
	
	$('.chooose-container').on('click','button',function(){
		if ($(this).hasClass('next')) {
			$('.chooose-container .step1').fadeOut();
			$('.chooose-container .step2').fadeIn();
			$('.chooose-container .title').text('选择学校');
			var provinceName = $('.step1 li.current').text();
			var data = {provinceName: provinceName};
			$.ajax({
				url: 'assets/json/province.json',
			    type: 'post',
			    data: JSON.stringify(data),
			    contentType : "application/json; charset=utf-8",
			    dataType: 'json',
			    async: false,
			    cache : false,
			    success:function(response){
			    		$('.step2 .list').html('');
					var resp = response.provinceList;
					$.each(resp, function(i,item) {
						if (provinceName == item.provinceName) {
							var schoolResp = item.schoolList;
							$.each(schoolResp, function(i,item) {
								var provinceList = '';
								provinceList = $('<li>').data('data-id',item.schoolId).text(item.schoolName);
								$('.step2 .list').append(provinceList);
							});
						}
					});
				}
			});
			
			$('.step2 .list li:first').addClass('current');
		} else if ($(this).hasClass('last')) {
			$('.chooose-container .step2').fadeOut();
			$('.chooose-container .step1').fadeIn();
			$('.chooose-container .title').text('选择学校所在省份');
		} else if ($(this).hasClass('cancel')) {
			$('.choose-school-wapper').fadeOut(function(){
				$('.chooose-container .step2').fadeOut();
				$('.chooose-container .step1').fadeIn();
				$('.chooose-container .title').text('选择学校所在省份');
			});
		} else if ($(this).hasClass('ok')) {
			$('.choose-school-wapper').fadeOut(function(){
				$('.chooose-container .step2').fadeOut();
				$('.chooose-container .step1').fadeIn();
				$('.chooose-container .title').text('选择学校所在省份');
			});
			var schoolId = $('.step2 li.current').data('data-id');
			var schoolJsonUrl = 'assets/data/'+ schoolId +'.json';
			$.ajax({
				url: schoolJsonUrl,
			    type: 'post',
			    data: '',
			    contentType : "application/json; charset=utf-8",
			    dataType: 'json',
			    async: false,
			    cache : false,
			    success:function(response){
			    		$('#school .link-wapper').html('');
					var resp = response.linkList;
					$.each(resp, function(i,item) {
						var linkList = '';
						linkList = '<li><a href="'+ item.linkUrl +'">'+ item.linkName +'</a></li>' ;
						$('#school .link-wapper').append(linkList);
					});
				}
			});
		}
		
	});
}

function commonList() {
	$.ajax({
		url: 'assets/json/common.json',
	    type: 'post',
	    data: {},
	    contentType : "application/json; charset=utf-8",
	    dataType: 'json',
	    async: false,
	    cache : false,
	    success:function(response){
	    		$('#common .link-wapper').html('');
			var resp = response.commonList;
			$.each(resp, function(i,item) {
				var commonList = '';
				commonList = '<li><a href="'+ item.linkUrl +'" target="_blank">'+ item.linkName +'</a></li>';
				$('#common .link-wapper').append(commonList);
			});
		}
	});
			
}
