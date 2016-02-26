;// JavaScript Document
var gdlabel;
var gdtype;
var info2sex;
var pageid;
$(document).ready(function(e) {
  bindlinks();
	dismymsg();
	$("#public-btn").click(newtransaction);
	gdtype=$("input[name='goodType']:first").val();
	$("input[name='goodType']").click(function(){gdtype=$(this).val();});
	gdlabel=$("input[name='label']:first").val();
	$("input[name='label']").click(function(){gdlabel=$(this).val();});
	info2sex=$("input[name='sex']:first").val();
	$("input[name='sex']").click(function(){info2sex=$(this).val();});
	$("#info2-submit").click(modifyinfo);
});

function finishtran(gdid){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'endtrans',goodId:gdid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success:function(datas,textStatus,XMLHttpRequest){
			if(datas.codes==200){
			  alert('已结束交易');
				dismypub();
			}
		}
	});
}
function dismypub(){
	pageid=1;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmygood',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success:function(datas,textStatus,XMLHttpRequest){
			html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br>';
				if(datas.data[i].ifFinish=='未结束'){
				html+='<button class="btn finishjy" onClick="finishtran('+datas.data[i].goodId+')">结束交易</button></div>';
				}else{
					html+='</div>';
				}
			}
			$("div.info3").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagepub()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagepub()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function getpagepub(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmygood',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success:function(datas,textStatus,XMLHttpRequest){
			html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br>';
				if(datas.data[i].ifFinish=='未结束'){
				html+='<button class="btn finishjy" onClick="finishtran('+datas.data[i].goodId+')">结束交易</button></div>';
				}else{
					html+='</div>';
				}
			}
			$("div.info3").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagepub()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagepub()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function dismysell(){
	pageid=1;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern1',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info5").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagesell()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagesell()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function getpagesell(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern1',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info5").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagesell()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagesell()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function dismybuy(){
	pageid=1;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern2',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info6").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagebuy()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagebuy()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function getpagebuy(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern2',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info6").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagebuy()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagebuy()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function dismyrent(){
	pageid=1;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern3',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info7").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagerent()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagerent()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function getpagerent(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern3',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info7").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagerent()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagerent()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function dismysrent(){
	pageid=1;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern4',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info8").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagesrent()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagesrent()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}
function getpagesrent(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showmyconcern4',pageId:pageid,token:$.cookie('TOKEN')},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success: function(datas,textStatus,XMLHttpRequest){
			var html='';
			for(var i=0;i<datas.num;i++){
				html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
			}
			$("div.info8").html(html);
			html='';
			pgnum='第&nbsp;'+pageid+'&nbsp;页';
			if(pageid==1){
			 html+='';
			}else{
			  html+='<a href="javascript:;" onClick="pageid-=1;getpagesrent()">上一页&nbsp;</a>';
			}
			html+='<a style="cursor:default">'+pgnum+'</a>';
			if(datas.finish=='0'){
			  html+='<a href="javascript:;" onClick="pageid+=1;getpagesrent()">&nbsp;下一页</a>';
		  }else{
			  html+='';
			}
			$("div.page").html(html);
		}
	});
}

function newtransaction(){
	if($("#fileSubmit").css('display')!='none'){
		alert("请先点击确认上传图片或者将选中的图片清空！");
	}else{
		var gdname=$("#gdname").val();
		var gdprice=$("#gdprice").val();
		var gddesc=$("#gddesc").val();
		$.ajax({
			type:"POST",
			dataType:"json",
			url:"../control/goodControl.php",
			data:{request:'addGood',token:$.cookie('TOKEN'),goodName:gdname,goodPrice:gdprice,goodType:gdtype,goodDesc:gddesc,label:gdlabel,imgUrl:Array(imgUrl[0],imgUrl[1],imgUrl[2])},
			success: function(datas,textStatus,XMLHttpRequest){
				if(datas.codes==200){
					alert('发布成功!');
				}else{
					alert(datas.codes);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 }
		});
	}
}

function dismymsg(){
	$.ajax({
		type:"POST",
		data:{request:"personInfo",token:$.cookie('TOKEN')},
		url:"../control/userControl.php",
		dataType:"json",
		success:function (data){
			$("#info1-nickname").html(data.data.userName);
			$.cookie('USERNAME',data.data.userName);
			$("#info1-email").html(data.data.email);
			$("#info1-sex").html(data.data.sex);
			$("#info1-time").html(data.data.regisTime);
			data.data.phone+='';
			data.data.qq+='';
			if(data.data.phone===''){data.data.phone='null'}
			if(data.data.qq===''){data.data.qq='null'}
			$("#info2-nickname").val($.cookie('USERNAME'));
			$("#info1-phone").html(data.data.phone);
			$("#info1-qq").html(data.data.qq);
			$("#info2-phone").val(data.data.phone);
			$("#info2-qq").val(data.data.qq);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 }
	});
}

function bindlinks(){
		var as=document.getElementById("ul-1").getElementsByTagName('a');
		for(var i=0;i<as.length;i++){
			(function(i){as[i].onclick=function(){
				var thisi=i;
				for(var j=0;j<as.length;j++){
					as[j].parentNode.className="";
				}
				this.parentNode.className="center-select";
				var name=thisi+1;
				name='info-'+name;
				for(var k=0;k<as.length;k++){
					var tmpk=k+1;
					tmpk='info-'+tmpk;
					$("#"+tmpk).addClass('hide');
				}
				$("#"+name).removeClass('hide');
				if(i==4) {dismysell();}
				if(i==5) {dismybuy();}
				if(i==6) {dismyrent();}
				if(i==7) {dismysrent();}
			}})(i)
		}
}

function modifyinfo(){
	var modinickname=$("#info2-nickname").val();
	var psd1=$("#info2-psd1").val();
	var psd2=$("#info2-psd2").val();
	var info2phone=$("#info2-phone").val();
	var info2qq=$("#info2-qq").val();
	var in2sex=info2sex;
	if(psd1===psd2&&psd1!=''){
		$.ajax({
			type:"POST",
			dataType:"json",
			url:"../control/userControl.php",
			data:{request:'updateInfo',userName:modinickname,newPw:psd2,phone:info2phone,qq:info2qq,sex:in2sex,token:$.cookie('TOKEN')},
			 error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			success:function(datas){
				if(datas.codes==200){
					$.cookie('USERNAME',modinickname);
					alert('修改成功');
				}
				else{
					alert('修改失败');
				}
			}
		});
	}else if(psd1==''){
		alert('密码不能为空');
	}else{
		alert('两次的密码输入不一样，请检查再提交');
	}
}