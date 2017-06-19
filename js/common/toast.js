 /**
 * ------------------------------------------------------------------
 * 消息提示框封装类
 * ------------------------------------------------------------------
 */
$(function(){
	// console.log('jquery toast ready!');
	//提示框清除倒计时
	var CLEAR_TIME = 5000;
	//固定消息头文字
	var HEADING = '系统提示';

	//显示提示框
	function show(msg,type){
		try{
			var options = {
				heading : HEADING,
				text : msg,
				icon : type,
				showHideTransition: 'fade',
				allowToastClose: true,
				hideAfter: CLEAR_TIME,
				stack: 5, 
				position: 'bottom-right',
				textAlign: 'left',
				loader: true, 
				beforeShow: function () {}, // will be triggered before the toast is shown
			    afterShown: function () {}, // will be triggered after the toat has been shown
			    beforeHide: function () {}, // will be triggered before the toast gets hidden
			    afterHidden: function () {} 
			};
			$.toast(options);
		}catch(e){
			console.error(e.message);
		}
	}


	//扩展方法到jQuery对象
	$.extend({
		/**
	  	 * 成功提示
		 * @param {Object} message
	  	 */
	  	success : function(msg){
	  		show(msg,'success');
	  	},
	  	/**
	  	 * 警告提示
		 * @param {Object} message
	  	 */
	  	warning : function(msg){
	  		show(msg,'warning');
	  	},
	  	/**
	  	 * 异常提示
		 * @param {Object} message
	  	 */
	  	error 	: function(msg){
	  		show(msg,'error');
	  	},
	  	/**
	  	 * 消息提示
		 * @param {Object} message
	  	 */
	  	info 	: function(msg){
	  		show(msg,'info');
	  	},
	  	/**
	  	 * 消息提示
		 * @param {Object} message
		 * @param {Object} callback
	  	 */
	  	alert	: function(msg,callback){
	  		bootbox.alert({
	  			title : '系统消息',
	  			message : msg,
	  			 button: {
			        label: '<i class="fa fa-check"></i> 确定'
			    },
			    callback: function(result){
			    	if(result){
			    		callback(result);
			    	}
			    }
	  		});
	  	}
	  	/**
	  	 * 确认提示
		 * @param {Object} message
		 * @param {Object} success_callback
		 * @param {Object} error_callback
	  	 */
	  	// bootbox.prompt("prompt msg!",function(val){
		// 	console.log('prompt done:' + val);
		// });
		// bootbox.confirm("confirm msg!",function(){
		// 	console.log('confirm done');	
		// });
	});
});