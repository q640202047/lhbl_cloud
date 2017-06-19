
$(function(){
	//私有常量集合
	var CONSTANT = {
		USER_LOGIN_URL : JsUtils.getRootPath() + '/do_login',
		CODE_IMG_URL   : JsUtils.getRootPath() + '/captcha?'
	}

	//绑定事件
	$("#codeImg").click(relaodCode);
	$("#loginBtn").click(login);
	
	//表单验证初始化
	valid();	
	//初始化页面加载验证码
	relaodCode();

	/********************************** 私有方法 *****************************/
	/***
	 * 刷新验证码
	 * @param {Object} options 配置对象
	 * @param {Object} header  请求头参数
	 */
	function relaodCode(){
		 console.log('relaodCode come in');
		$("#codeImg").attr('src',CONSTANT.CODE_IMG_URL + Math.random());
		// $("#codeImg").attr('src','http://avatar.csdn.net/1/E/E/1_qq_27080247.jpg');
	}

	/***
	 * 登录
	 */
	function login() {
		console.log('login come in');
		//表单内容获取
		var username = $("#username").val();
		var password = $("#password").val();
		var captcha = $("#captcha").val();

		if($("#loginForm").valid()){
			//发送请求
			$.sendPost({
				url: CONSTANT.USER_LOGIN_URL,
				params: {
					username : username,
					password : password,
					captcha : captcha
				}
			}).then(function(result) {
				if(result.code == 200) {
					document.location.href = JsUtils.getRootPath() + "/index";
				}
			},function(res){
				relaodCode();
			});
		}
	}

	/***
	 * 表单校验
	 */
	 function valid(){
	 	try{
	 		console.log('valid come in!');

		 	$( "#loginForm" ).validate({
		 		rules : {
		 			username : {
		 				required: true,
        				minlength: 2
		 			},
		 			password : {
		 				required: true,
        				minlength: 2
		 			},
		 			captcha	 : 'required'
		 		},
		 		messages : {
		 			username : {
						required: '请填写账号',
        				minlength: "用户名长度太短"
		 			},
		 			password : {
						required: '请填写登录密码',
        				minlength: "密码长度太短"
		 			},
		 			captcha	 : '请填写验证码'
		 		},
		 		errorElement: "label",
		 		errorPlacement : function(error, element){
		 			error.appendTo(element.parent());  
		 		},
				submitHandler : login
		 	});
	 	}catch(e){
	 		console.error(e.messages);
	 	}
	 }
});