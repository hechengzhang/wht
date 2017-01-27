$('body').ready(function(){
	provinceList(); // 省份列表
	searchEvent(); // 搜索
});

function searchEvent() {
	// 搜索引擎切换
	$('.search-input').on('click','button',function(){
		$(this).addClass('current').siblings('.current').removeClass('current');
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

function provinceList() {
	$.ajax({
		url: 'assets/json/province.json',
	    type: 'post',
	    data: '',
	    contentType : "application/json; charset=utf-8",
	    dataType: 'json',
	    async: false,
	    cache : false,
	    success:function(response){
			var resp = response.provinceList;
			var provinceList = '';
			$.each(resp, function(i,item) {
				var provinceList = $('<a>').data('data-schoolList',item.schoolList).text(item.provinceName);
				$('#test').append(provinceList);
			});
			
			schoolHrefList();
		}
	});
}

function schoolHrefList() {
	$('#test').on('click','a',function(){
		var schoolList = $(this).data('data-schoolList');
		var html = '';
		$.each(schoolList, function(i,item) {
			html += '<a>'+ item.schoolName +'<input type="hidden" value="'+ item.schooId +'" /></a>';
			$('#test2').html(html);
		});
	});
	
	$('#test2').on('click','a',function(){
		var schoolId = $(this).find('input').val();
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
				var resp = response.linkList;
				var linkList = '';
				$.each(resp, function(i,item) {
					linkList += '<a href="'+ item.linkUrl +'">'+ item.linkName +'</a>' ;
					$('#test3').html(linkList);
				});
			}
		});
	});
}
