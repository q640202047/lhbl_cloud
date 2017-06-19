$(function(){
	/**
	 * 按钮事件绑定
	 */
	$('.menu-list > a').click(navStyleHandler);
	$('.navbar-nav li').click(menuStyleHandler);

	//左侧导航栏切换监听
	function navStyleHandler(){
		var widget = $(this),	//当前a标签对象
		    nav_li = widget.parent(),	//父级的li对象
			nav_child = nav_li.find('> ul');	//子节点的ul对象

		//判断是选中还是未选中
		if(nav_li.hasClass('selected')){
			//selected状态：收缩起来
			nav_child.slideUp(200, function() {
				nav_child.css('display','none');
				nav_li.removeClass('selected');
			});
		}else{
			// unselected状态：展开菜单
			nav_child.slideDown(200,function(){
				nav_child.css('display','block');	
			});
			nav_li.addClass('selected');
		}
	}

	//顶部主菜单切换监听
	function menuStyleHandler(){
		var menu_li = $(this);
		//先清除所有菜单选中状态
		$('.navbar-nav > li').each(function(index,element){
			$(element).removeClass('active');
		})
		menu_li.addClass('active');
	}
});
