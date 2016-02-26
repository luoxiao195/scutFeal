;// JavaScript Document
/*login-regist */
var postdata=new Array();
var logWarn=$("#log-warning");
var regWarn=$("#reg-warning");
var Token;
var classify;
var itemid;
var searchinfo;

$(document).ready(function(e) {
	checkloginfo();
	$("#regist").click(registfunction);
	$("#login").click(loginfunction);
	$('.theme-regist').click(registin);
	$('.theme-poptit.regist .close').click(registout);
	$('.theme-login').click(loginin);
	$('.theme-poptit.login .close').click(loginout);
	$('.theme-poptit.warn .close').click(warnout);
	$('#reg-veri').click(registverify);
	$('#log-veri').click(loginverify);
	$('#search-btn').click(searchinfo);
});

function searchinfo(){
	searchinfo=$('#searchkey').val();
	classify=9;
	$.cookie('CLASSIFY',9);
	$.cookie('INFO',searchinfo);
	window.location.href="http://scutfeal.sinaapp.com/view/subclassification.html";
}
function checkloginfo(){
	if($.cookie('TOKEN')!='null'&&$.cookie('USEREMAIL')!='null'&&$.cookie('TOKEN')!=null&&$.cookie('USEREMAIL')!=null){
		$(".head .header ul").find('li').eq(1).html("<a href='index.html' onclick='var a=logoff();console.log(a);if(!a) return false;'>退 出</a>")
				$(".head .header ul").find('li').eq(3).html("用户：" + $.cookie('USEREMAIL'));      
				loginout();
				$("#regist").click(registfunction);
				$("#login").click(loginfunction);
				$('.theme-regist').click(registin);
				$('.theme-poptit.regist .close').click(registout);
				$('.theme-login').click(loginin);
				$('.theme-poptit.login .close').click(loginout);
				$('.theme-poptit.warn .close').click(warnout);
				$('#reg-veri').click(registverify);
				$('#log-veri').click(loginverify);
				$('#search-btn').click(searchinfo);
	}else{
		$(".head .header ul").find('li').eq(1).html('<a href="javascript:;" class="theme-regist">注 册</a>');
				$(".head .header ul").find('li').eq(3).html('<a href="javascript:;" class="theme-login">登 录</a>');
				$("#regist").click(registfunction);
				$("#login").click(loginfunction);
				$('.theme-regist').click(registin);
				$('.theme-poptit.regist .close').click(registout);
				$('.theme-login').click(loginin);
				$('.theme-poptit.login .close').click(loginout);
				$('.theme-poptit.warn .close').click(warnout);
				$('#reg-veri').click(registverify);
				$('#log-veri').click(loginverify);
				$('#search-btn').click(searchinfo);
	}
}
function loginfunction(){
	postdata[0]=$("#login-email").val();
	postdata[1]=$("#login-psd").val();
	postdata[2]=$("#log-verifycode").val();
	$.ajax({
		type:"POST",
		url:"../control/userControl.php",
		data:{email:postdata[0],password:postdata[1],request:'login',vaildCode:postdata[2]},
		dataType:"json",
		async:false,
		error: function(){
			logWarn.html("出错了，登陆失败！")
			logWarn.css("color",'#C53824');
		},
		success: function(data){
			if(data.codes==200){
				Token=data.data['token'];
				$.cookie('TOKEN',Token);
				$.cookie('USEREMAIL',postdata[0]);
				$(".head .header ul").find('li').eq(1).html("<a href='javascript:;' onclick='logoff()'>退 出</a>")
				$(".head .header ul").find('li').eq(3).html("用户：" + postdata[0]);
				loginout();
				$("#regist").click(registfunction);
				$("#login").click(loginfunction);
				$('.theme-regist').click(registin);
				$('.theme-poptit.regist .close').click(registout);
				$('.theme-login').click(loginin);
				$('.theme-poptit.login .close').click(loginout);
				$('.theme-poptit.warn .close').click(warnout);
				$('#reg-veri').click(registverify);
				$('#log-veri').click(loginverify);
				$('#search-btn').click(searchinfo);
			}
			else
			{
				logWarn.css("color",'#C53824');
				if(data.codes==701)
				logWarn.html("系统发生错误，请重试！");
				else if(data.codes==352)
				logWarn.html("用户名不存在或密码错误！");
				else if(data.codes==353)
				logWarn.html("用户名或密码不能为空！");
				else if(data.codes==354)
				logWarn.html("验证码错误！");
			}
		}
	});
}
function gocenter(){
	if($.cookie('TOKEN')!='null'&&$.cookie('TOKEN')!=null){
		return true;
	}else{
		return false;
	}
}
function logoff(){
	var result;
	$.ajax({
		type:"POST",
		url:"../control/userControl.php",
		data:{request:'logout',token:$.cookie('TOKEN')},
		dataType:"json",
		async:false,
		success: function(data){
			if(data.codes==200){
				Token='null';
				$.cookie('TOKEN','null');
				$(".head .header ul").find('li').eq(1).html('<a href="javascript:;" class="theme-regist">注 册</a>');
				$(".head .header ul").find('li').eq(3).html('<a href="javascript:;" class="theme-login">登 录</a>');
				$("#regist").click(registfunction);
				$("#login").click(loginfunction);
				$('.theme-regist').click(registin);
				$('.theme-poptit.regist .close').click(registout);
				$('.theme-login').click(loginin);
				$('.theme-poptit.login .close').click(loginout);
				$('.theme-poptit.warn .close').click(warnout);
				$('#reg-veri').click(registverify);
				$('#log-veri').click(loginverify);
				$('#search-btn').click(searchinfo);
				result=true;
			}
			else
			{
				$('.theme-popover-mask').fadeIn(100);
				$('.theme-popover.warn').slideDown(200);
				result= false;
			}
		},
		error: function(){
			$('.theme-popover-mask').fadeIn(100);
			$('.theme-popover.warn').slideDown(200);
			alert('yes');
		}
	});
	return result;
}
function registfunction(){
	postdata[0]=$("#regist-name").val();
	postdata[1]=$("#regist-email").val();
	postdata[2]=$("#regist-psd").val();
	postdata[3]=$("#reg-verifycode").val();
	$.ajax({
		type:"POST",
		url:"../control/userControl.php",
		async:false,
		data:{userName:postdata[0],email:postdata[1],password:postdata[2],vaildCode:postdata[3],request:'register'},
		dataType:"json",
		error:function(){
			regWarn.html("出错了，注册失败！")
			regWarn.css("color",'#C53824');
		},
		success: function(data){
			if(data.codes==200){
				regWarn.html("注册成功，即将跳到登录框......");
				regWarn.css("color",'#01A186');
				setTimeout(function(){
					registout();
					loginin();
				},1500);
			}
			else{
				regWarn.css("color",'#C53824');
				if(data.codes==700)
				regWarn.html("系统发生错误，请重试！");
				else if(data.codes==351)
				regWarn.html("用户名已被占用！");
				else if(data.codes==353)
				regWarn.html("用户名或密码不能为空！");
				else if(data.codes==354)
				regWarn.html("验证码错误！");
			}
		}
	});
}
function registin(){
	$('.theme-popover-mask').fadeIn(100);
	$('.theme-popover.regist').slideDown(200);
	registverify();
	$("#regist-name").val('');
	$("#regist-email").val('');
	$("#regist-psd").val('');
	$("#reg-verifycode").val('');
	regWarn.html(' ');
}
function registout(){
	$('.theme-popover-mask').fadeOut(100);
	$('.theme-popover.regist').slideUp(200);
}
function loginin(){
	$('.theme-popover-mask').fadeIn(100);
	$('.theme-popover.login').slideDown(200);
	loginverify();
	$("#login-email").val('');
	$("#login-psd").val('');
	$("#log-verifycode").val('');
	logWarn.html(' ');
}
function loginout(){
	$('.theme-popover-mask').fadeOut(100);
	$('.theme-popover.login').slideUp(200);
}
function warnout(){
	$('.theme-popover-mask').fadeOut(100);
	$('.theme-popover.warn').slideUp(200);
}
function registverify(){
	var url="../control/userControl.php?getValidCode="+Math.random();
	$('#reg-veri').attr('src',url);
}
function loginverify(){
	var url="../control/userControl.php?getValidCode="+Math.random();
	$('#log-veri').attr('src',url);
}

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options = $.extend({}, options);
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
