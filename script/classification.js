;// JavaScript Document
$(document).ready(function(e) {
  allboard();
	getcladata();
});

function allboard(){
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
}
function getcladata(){
	switch($.cookie('CLASSIFY')){
		case '1':{
			$("#cla-layer1").css('display','block');
			$("#cla-layer1 div.cla-subTitle").html('书籍');
			$("#cla-layer1 span.cla-more").html("<a href='subclassification.html' target='_blank' onClick='"+'$.cookie("CLASSIFY",11)'+"'>&gt;&gt;more</a>");
			$("#cla-layer2").css('display','block');
			$("#cla-layer2 div.cla-subTitle").html('学习用品');
			$("#cla-layer2 span.cla-more").html("<a href='subclassification.html'  target='_blank' onClick='"+'$.cookie("CLASSIFY",12)'+"'>&gt;&gt;more</a>");
			$("#cla-layer3").css('display','blcok');
			$("#cla-layer3 div.cla-subTitle").html('办公用品');
			$("#cla-layer3 span.cla-more").html("<a href='subclassification.html'  target='_blank' onClick='"+'$.cookie("CLASSIFY",13)'+"'>&gt;&gt;more</a>");
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{request:'studygood'},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					console.log('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState);
					console.log('XMLHttpRequest.status:'+XMLHttpRequest.status);
					console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
				},
				success:function(datas){
					for(var i=0;i<9;i++){
						var html='<a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a>';
						$(".cla-item").eq(i).html(html);
					}
				}
			});
			break;
		}
		case '2':{
			$("#cla-layer1").css('display','block');
			$("#cla-layer1 div.cla-subTitle").html('日常用品');
			$("#cla-layer1 span.cla-more").html("<a href='subclassification.html' target='_blank' onClick='"+'$.cookie("CLASSIFY",21)'+"'>&gt;&gt;more</a>");
			$("#cla-layer2").css('display','block');
			$("#cla-layer2 div.cla-subTitle").html('小家电');
			$("#cla-layer2 span.cla-more").html("<a href='subclassification.html'  target='_blank' onClick='"+'$.cookie("CLASSIFY",22)'+"'>&gt;&gt;more</a>");
			$("#cla-layer3").css('display','none');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{request:'lifegood'},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					console.log('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState);
					console.log('XMLHttpRequest.status:'+XMLHttpRequest.status);
					console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
				},
				success:function(datas){
					for(var i=0;i<6;i++){
						var html='<a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a>';
						$(".cla-item").eq(i).html(html);
					}
				}
			});
			break;
		}
		case '3':
		default:{
			$("#cla-layer1").css('display','block');
			$("#cla-layer1 div.cla-subTitle").html('手机（用品）');
			$("#cla-layer1 span.cla-more").html("<a href='subclassification.html' target='_blank' onClick='"+'$.cookie("CLASSIFY",11)'+"'>&gt;&gt;more</a>");
			$("#cla-layer2").css('display','block');
			$("#cla-layer2 div.cla-subTitle").html('电子产品');
			$("#cla-layer2 span.cla-more").html("<a href='subclassification.html'  target='_blank' onClick='"+'$.cookie("CLASSIFY",12)'+"'>&gt;&gt;more</a>");
			$("#cla-layer3").css('display','blcok');
			$("#cla-layer3 div.cla-subTitle").html('电脑（用品）');
			$("#cla-layer3 span.cla-more").html("<a href='subclassification.html'  target='_blank' onClick='"+'$.cookie("CLASSIFY",13)'+"'>&gt;&gt;more</a>");
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{request:'digitgood'},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					console.log('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState);
					console.log('XMLHttpRequest.status:'+XMLHttpRequest.status);
					console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
				},
				success:function(datas){
					for(var i=0;i<9;i++){
						var html='<a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a>';
						$(".cla-item").eq(i).html(html);
					}
				}
			});
		}
	}
}