$(function(){
	var PAGESIZE = 10;

	//将方法绑定到jQuery对象上
	$.fn.extend({
		tableInit : tableInit
	});

	//datatable初始化封装
	function tableInit(options){
		//获取调用的控件对象
		var widget = $(this),
			defaultOptions = {
				"bFilter": false, 
				"iDisplayLength" : PAGESIZE,//默认每页数量
				"ordering" : false,
				"bSort" : false, //排序功能
				"stateSave" : true,
				"retrieve" : true,
				"processing": true,
				"serverSide": true,
				"language": {
		            "lengthMenu": "每页展示 _MENU_ 条记录",
		            "zeroRecords": "查询记录为空",
		            "info": "当前记录： _PAGE_ / _PAGES_",
		            "infoEmpty": "没有可显示的数据",
		            "infoFiltered": "(总共筛选出 _MAX_ 页)",
		            "search": "搜索",
		            "processing": "正在加载数据...",
		            "paginate": {
                        "first": "首页",
                        "previous": "上一页",
                        "next": "下一页",
                        "last": "末页",
                        "jump": "跳转"
                    },
		        },
			};
		//实例化
		widget.DataTable($.extend(defaultOptions,options));
	}
});
