JsUtils = {};

//时间戳转换为日期格式
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
};

/* 获取项目路径 */
JsUtils.getRootPath = function(){
	return webcontext;
};

//datebox时间戳 转换
JsUtils.formatDate=function(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();
    if(localeLanguage=='zh_CN'){
    	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }else{
    	return (d<10?('0'+d):d)+'-'+(m<10?('0'+m):m)+'-'+y;
    }
} ;

//弹出加载层
JsUtils.load = function(msg) {  
 $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
 $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
}  
 
JsUtils.disLoad = function() {  
     $(".datagrid-mask").remove();  
     $(".datagrid-mask-msg").remove();  
 }

function ww4(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    var h = date.getHours();  
    var min = date.getMinutes();
    var s = date.getSeconds();
    return  y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+min + ':' + s;  
      
}  
function w4(s){  
    var reg=/[\u4e00-\u9fa5]/  //利用正则表达式分隔  
    var ss = (s.split(reg));  
    var y = parseInt(ss[0],10);  
    var m = parseInt(ss[1],10);  
    var d = parseInt(ss[2],10);  
    var h = parseInt(ss[3],10);  
    if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h)){  
        return new Date(y,m-1,d,h);  
    } else {  
        return new Date();  
    }  
}    


//获取七牛图片domain
var imgDomain="";
JsUtils.getImageDomain=function(){
	if(imgDomain==""){
		$.ajax({
			  url: JsUtils.getRootPath()+'/AdvertVideo/getImageDomain.hls',
			  async: false,
			  success: function(result){
				  imgDomain=result;
			  }
			});
	};
	return imgDomain;
};

/**
 * 秒转化为时长
 * 例如    300 ------> '00:06:00'
 * @param miao
 * @returns {String}
 */
function convertTime(miao){
	var s = parseInt(miao).toFixed(0);
	var shi = parseInt(s / 3600).toFixed(0);
	s = s % 3600;
	var fen = parseInt(s / 60).toFixed(0);
	s = s % 60;
	return (shi > 9 ? shi : ("0" + shi)) + ":"
			+ (fen > 9 ? fen : ("0" + fen)) + ":"
			+ (s > 9 ? s : ("0" + s));
}


/**
 * 表格字段太长的时候使用
 * 默认超过10个字就从第7个开始填充‘...’
 * 鼠标放上去以tip的形式展示全部字符
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function showTip(value, row, index){
		if(value!=null && value !='' && value != undefined){
	        var abValue = value;
	        if (value.length>=10) {
	            abValue = value.substring(0,7) + "...";
	        }
	        var content = '<div  title="' + value + '" class="tip">' + abValue + '</div>';
	        
	        return content;
		}
}

String.prototype.format=function()  
{  
  if(arguments.length==0) return this;  
  for(var s=this, i=0; i<arguments.length; i++)  
    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
  return s;  
}; 

/**
 * 打开图片
 */
JsUtils.openUrl = function (url){
//	$('#windowImgDiv').window('open');
//	$("#windowImgDiv").find("img").attr("src",url);
 $.messager.showPayMsg({title:"图像预览",width:350},"<img src = \""+url+"\"></img>");
	 
}

JsUtils.downFile = function(fileId){
	var url = JsUtils.getRootPath()+'/file/downFile.shtml';
	$.post(url,{fileId:fileId},function(result){
		
	});
}

JsUtils.openEasyUIWindow = function(title,thisobj,width,height,url){
 	thisobj.dialog({
	    title: title,
	    width: width,
	    height: height,
	    closed: false,
	    cache: false,
	    content:  "<img src="+url+"></img>",
	    modal: true
	});
 };
 
 JsUtils.openEasyUIWindow2 = function(title,thisobj,width,height,url){
 	thisobj.window({
	    title: title,
	    width: width,
	    height: height,
	    href: url
	});
	
	thisobj.window("open");
 };
 
 

JsUtils.queryOrderPay = function(row){
	if(row.payType === 5){
		 return ;
	 }
	 var url = JsUtils.getRootPath()+'/orderPay/queryOrderPayView.shtml';
	$.post(url,{orderCode:row.orderCode,payType:row.payType},function(result){
		 var s = "<table><tr><td>支付方式:</td><td>　　{0}</td></tr><tr><td nowrap='nowrap'>第三方支付号:</td><td>　　{1}</td></tr><tr><td>业务结果:</td><td>　　{2}</td></tr><tr><td>总金额:</td><td>　　{3}</td></tr><tr><td>现金支付金额:</td><td>　　{4}</td></tr><tr><td>支付完成时间:</td><td>　　{5}</td></tr></table>";
		 var paystr = "微信";
		 
		 if(row.payType === 1){
			 paystr = "支付宝";
		 }else if(row.payType === 2){
			 paystr = "微信";
		 }else if(row.payType === 3){
			 paystr = "银联";
		 }else if(row.payType === 4){
			 paystr = "财付通";
		 }
		 var datestr = '';
		 if(result.endTime)
			 datestr = new Date(result.endTime).format("yyyy-MM-dd hh:mm:ss");
		 s = s.format(paystr,result.payOrderCode?result.payOrderCode:"无","SUCCESS"===result.resultCode?"成功":"失败",result.totalFee?(result.totalFee/100):"无",result.cashFee?(result.cashFee/100):"无",datestr?datestr:"无");
		 $.messager.showPayMsg({title:"支付详情",width:450},s);
	 });
	
}

JsUtils.html_encode = function (str)   {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&gt;");   
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  s = s.replace(/ /g, "&nbsp;");   
  s = s.replace(/\'/g, "&#39;");   
  s = s.replace(/\"/g, "&quot;");   
  s = s.replace(/\n/g, "<br>");   
  return s;   
};

JsUtils.html_decode =function (str)   {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&gt;/g, "&");   
  s = s.replace(/&lt;/g, "<");   
  s = s.replace(/&gt;/g, ">");   
  s = s.replace(/&nbsp;/g, " ");   
  s = s.replace(/&#39;/g, "\'");   
  s = s.replace(/&quot;/g, "\"");   
  s = s.replace(/<br>/g, "\n");   
  return s;   
};


JsUtils.alertMessage = function(obj,callback){
	if(obj === 1 || obj === '1'){
		$.messager.alert("'温馨提示'","操作成功","'温馨提示'",callback);
	}else if(obj.code === '405' || obj.code === 405){
		$.messager.alert("'温馨提示'",obj.message,"'温馨提示'",callback);
	}else {
		$.messager.alert("'温馨提示'","操作失败");
	}
	
}

JsUtils.limitTextArea = function(field,maxlimit){
	if(!maxlimit){
		maxlimit = 400;
	}
    if (field.value.length > maxlimit)
     field.value = field.value.substring(0, maxlimit);
      
 }
 
JsUtils.isIP = function(ip)  
{  
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;  
    if (reSpaceCheck.test(ip))  
    {  
        ip.match(reSpaceCheck);  
        if (RegExp.$1<=255&&RegExp.$1>=0  
          &&RegExp.$2<=255&&RegExp.$2>=0  
          &&RegExp.$3<=255&&RegExp.$3>=0  
          &&RegExp.$4<=255&&RegExp.$4>=0)  
        {  
            return true;   
        }else  
        {  
            return false;  
        }  
    }else  
    {  
        return false;  
    }  
} 


JsUtils.addPlaceholder = function() {
	if (!placeholderSupport()) { // 判断浏览器是否支持 placeholder
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
	}
	;
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
}

JsUtils.load = function(msg) {  
 $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
 $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
}  
 
JsUtils.disLoad = function() {  
     $(".datagrid-mask").remove();  
     $(".datagrid-mask-msg").remove();  
 }
