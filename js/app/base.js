$(function() {
	/**
	 * 按钮事件绑定
	 */
	$('.navbar-nav li').click(menuStyleHandler);
	$('.menu-list > a').click(navStyleHandler);
	// $('.sub-menu > li').click(subMenuHandler);
	$('.me').click(meMenuHandler);

	//我的菜单样式切换
	function meMenuHandler(){
		var me = $(this),
		    me_menu = $('.me-menu');	//菜单

		//重置li的样式
		resetLIStyle(me_menu);

		if(!me_menu.hasClass('active')){
			me_menu.addClass('active');
			me.addClass('active');
		}else{
			me_menu.removeClass('active');
			me.removeClass('active');
		}
	}
	
	//顶部主菜单切换监听
	function menuStyleHandler(){
		var menu_li = $(this),
		    menu_ul = $(this).parent();
		//先清除所有菜单选中状态
		resetLIStyle(menu_ul);
		menu_li.addClass('active');
	}

	function subMenuHandler(){
		var current_li = $(this),	//当前点击的li对象
		    current_ul = $(this).parent(),	//当前li对象的父容器
		    parent_li = current_ul.parent('li'),	//ul的父容器li
		   	parent_ul = $('.main-navigation-menu');	//顶级容器

		if(!current_li.hasClass('active')){
			//所有顶级li清除样式
			resetLIStyle(parent_ul);
			//所有兄弟节点清除样式
			resetLIStyle(current_ul);

			//添加选中样式
			current_li.addClass('active');
			parent_li.addClass('active');
			parent_li.find('>a').addClass('selected');
		}
	}

	//左侧导航栏切换监听
	function navStyleHandler(){
		var widget = $(this),	//当前a标签对象
		    nav_li = widget.parent(),	//父级的li对象
			nav_child = nav_li.find('> ul'),	//子节点的ul对象
			nav_ul = $('.main-navigation-menu');

		//判断是选中还是未选中(selected只表示是否展开，不影响样式渲染)
		if(nav_li.hasClass('selected')){
			if(nav_child.length > 0){
				//selected状态：收缩起来
				nav_child.slideUp(200, function() {
					nav_child.css('display','none');
				});
			}
			nav_li.removeClass('selected');
		}else{
			// unselected状态：展开菜单
			if(nav_child.length > 0){
				nav_child.slideDown(200,function(){
					nav_child.css('display','block');	
				});	
			}
			// resetLIStyle(nav_ul);
			nav_li.addClass('selected');
		}
	}

	function resetLIStyle(UlWidget){
		$(UlWidget).find('li').each(function(index,element){
			if($(element).hasClass('active')){
				$(element).removeClass('active');	
			}
			if($(element).hasClass('selected')){
				$(element).removeClass('selected');
			}
		});
	}


	//根据菜单数量，调整主菜单样式
	var main_menu_length = $('.navbar-nav > ul li').length;
	console.log(main_menu_length);
	if(main_menu_length >= 5){
		$('body header div.header-container div.nav ul a').each(function(index,element){
			$(element).addClass('mini');
		});
	}else{
		$('body header div.header-container div.nav ul a').each(function(index,element){
			$(element).removeClass('mini');
		});
	}
});