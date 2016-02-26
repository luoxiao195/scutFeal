;// JavaScript Document
var ifstar;
$(document).ready(function(e) {
  goodinit();
	fillpage();
});

function fillpage(){
	var tk;
	if($.cookie('TOKEN')==null||$.cookie('TOKEN')=='null'){
		tk=1;
	}else{
		tk=$.cookie('TOKEN');
	}
	$.ajax({
		type:"POST",
		url:"../control/goodControl.php",
		dataType:"json",
		data:{goodId:$.cookie('ITEMID'),request:'goodInfo',token:tk},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success:function(datas,textStatus,XMLHttpRequest){
			if(datas.data.urlnum>0){
			  $("#bigimg").attr('src',datas.data.goodImg[0]);
			}
			for(var i=0;i<datas.data.urlnum;i++){
			  $("#good1 img").eq(i).attr('src',datas.data.goodImg[i]);
			}
			$("#good-info-message-title").html(datas.data.goodName);
			$("#good-info-message-type").html(datas.data.goodType);
			$("#good-info-message-label").html(datas.data.label);
			$("#good-info-message-price").html(datas.data.goodPrice);
			$("#good-info-message-end").html(datas.data.ifFinish);
			$("#good-info-message-desc").html(datas.data.goodDesc);
			$("#good-info-message-pubtime").html(datas.data.ReleaseTime);
			$("table td").eq(1).html(datas.data.user.userName);
			$("table td").eq(3).html(datas.data.user.phone);
			$("table td").eq(5).html(datas.data.user.qq);
			$("table td").eq(7).html(datas.data.user.email);
			if(tk==1){
				$("#good-info-image-down-collect").css('display','none');
			}else{
				$("#good-info-image-down-collect").css('display','block');
				if(datas.data.concern==0){
					$("#star").attr('src','../public/star.png');
					ifstar=0;
				}else{
					$("#star").attr('src','../public/unstar.png');
					ifstar=1;
				}
			}
			var html='';
			for(var i=0;i<datas.data.comnum;i++){
				html+='<div class="comment-item"><p>发布用户：'+datas.data.comment[i].userName+'</p><p class="comment-time">发布时间：'+datas.data.comment[i].giveTime+'</p><textarea style="width:1050px" rows="6" readonly>'+datas.data.comment[i].content+'</textarea></div></br>';
			}
			$("#conment-area").html(html);
		}
	});
}
function publishcom(){
	var content;
	content=$("#pubcomcontent").val();
	if($.cookie('TOKEN')=='null'||$.cookie('TOKEN')==null){
		alert('请先登录再评论');
	}else{
		$.ajax({
			type:"POST",
			dataType:"json",
			url:"../control/showgood.php",
			data:{goodId:$.cookie('ITEMID'),request:'comment',token:$.cookie('TOKEN'),content:content},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				console.log('readystate:'+XMLHttpRequest.readyState);
				console.log('status:'+XMLHttpRequest.status);
				console.log('response:'+XMLHttpRequest.responseText);
			},
			success:function(datas,textStatus,XMLHttpRequest){
				alert('发表成功');
				var html='';
				for(var i=0;i<datas.data.comnum;i++){
					html+='<div class="comment-item"><p>发布用户：'+datas.data.comment[i].userName+'</p><p class="comment-time">发布时间：'+datas.data.comment[i].giveTime+'</p><textarea style="width:1050px" rows="6" readonly>'+datas.data.comment[i].content+'</textarea></div></br>';
				}
				$("#conment-area").html(html);
			}
		});
	}
}
function goodinit(){
	var claAllproduct=$('.nav .nav-left h3.cla-allproduct');
	var claMainul=$('.main-ul');
	var bclaAllproduct=0;
	var bclaMainul=0;
	claAllproduct.mouseover(function(e) {
    claMainul.css('display','block');
  });
	claAllproduct.mouseout(function(e) {
		claMainul.css('display','none');
		claMainul.mouseover(function(e) {
    claMainul.css('display','block');
    });
		claMainul.mouseout(function(e) {
    claMainul.css('display','none');
    });		
  });
	$("#pubcomment").click(publishcom);
	for(var i=0;i<3;i++){
	  $("#good1 img").eq(i).click(function(){
			$("#bigimg").attr('src',$(this).attr("src"));
		});
	}
	$("#star").click(collect);
}
function collect(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'collect',goodId:$.cookie('ITEMID'),token:$.cookie('TOKEN'),concern:ifstar},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log('readystate:'+XMLHttpRequest.readyState);
			console.log('status:'+XMLHttpRequest.status);
			console.log('response:'+XMLHttpRequest.responseText);
		},
		success:function(datas,textStatus,XMLHttpRequest){
			if(datas.codes==200){
				if(ifstar==0){
					alert("收藏成功");
					ifstar=1;
					$("#star").attr('src','../public/unstar.png');
				}else{
					alert("取消收藏成功");
					ifstar=0;
					$("#star").attr('src','../public/star.png');
				}
			}
		}
	});
}