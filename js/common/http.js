 /**
 * ------------------------------------------------------------------
 * HTTP请求封装
 * ------------------------------------------------------------------
 */
$(function(){
	$.extend({
		/***
		 * 异步请求
		 * @param {Object} options 配置对象
		 * @param {Object} header  请求头参数
		 */
		send : function(options,header){
			var REQ_TIMEOUT = 20000;	//请求超时时间
			var dtd = $.Deferred();

			try{
				//参数的非空判断
				options.url = options.url || '';
				options.params = options.params || {};
				header = header || {};

				//发送异步请求
				$.ajax({
					type: 'POST', //默认请求类型为POST
					url: options.url, //拼接请求的URL
					headers: header, //指定请求头
					dataType: 'JSON', //返回数据类型
					data: options.params, //格式化成JSON字符串
					timeout: REQ_TIMEOUT,//请求超时
					//请求成功
					success: function(res) {
						//响应成功
						if(res.code == 200){
							dtd.resolve(res);
						}
						//用户未登录
						else if(res.code == 401){
							$.alert(res.message,function(result){
								window.href.location = '/login.html';
							});
							dtd.reject(res);
						}
						//其他错误情况
						else{
							$.warning(res.message);
							dtd.reject(res);
						}
					},
					//请求错误
					error: function(jqXHR, textStatus, errorThrown) {
						$.error('服务器连接失败!');
						dtd.reject(jqXHR);
					}
				});
			}catch(e){
				console.error(e.message);
			}
			return dtd.promise();
		}
	});
});