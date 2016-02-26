;// JavaScript Document
var value;

$(document).ready(function(e) {
	Token='null';
	getboardinfo();
	slidingtextbox();
});

function getboardinfo(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'showfirst'},
		async:false,
		error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
		},     
		success:function(datas){
			var html='';
			for(var i=0;i<9;i++){
				html+="<li><span class='item-type'>["+datas.data[0][i].goodType+"]</span><a>"+datas.data[0][i].goodName+"</a><span class='item-time'>"+datas.data[0][i].ReleaseTime+"</span></li>";
			}
			$("#col1").html(html);
			for(var i=0;i<8;i++){
				$(".good-item").eq(i).html("<a href='good.html' onClick='itemid="+datas.data[1][i].goodId+';$.cookie("ITEMID",itemid);'+"'><img src='"+datas.data[1][i].goodImg+"'><p>"+datas.data[1][i].goodName+"</p></a>");
			}
		}
	});
}
function slidingtextbox(){
	value=0;
	var box=$('#info-box');
	var col1=$('#col1');
	var col2=$('#col2');       
	col2.html(col1.html());
	var timer=setInterval(scrollUp,50);
	box.mouseover(function(){
		clearInterval(timer);
	});
	box.mouseout(function(){
		timer=setInterval(scrollUp,50);
	});
	function scrollUp(){
		if(box.scrollTop()>=col1.outerHeight()){
			value=0;
			box.scrollTop(value);
		}else{
		value++;
		box.scrollTop(value);
		}
	}
}