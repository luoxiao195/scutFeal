;// JavaScript Document
var pageid;
$(document).ready(function(e) {
  getsubdata();
	getconcern();
});

function getsubdata(){
	pageid=1;
	switch($.cookie('CLASSIFY')){
		case '11':{
			$("div.cla-subTitle").html('书籍');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subbook'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '12':{
			$("div.cla-subTitle").html('学习用品');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'substudy'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '13':{
			$("div.cla-subTitle").html('办公用品');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'suboffice'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '21':{
			$("div.cla-subTitle").html('日常用品');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'sublife'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '22':{
			$("div.cla-subTitle").html('小家电');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subem'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '31':{
			$("div.cla-subTitle").html('手机（用品）');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subphone'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '32':{
			$("div.cla-subTitle").html('电子产品');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subdigit'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '33':{
			$("div.cla-subTitle").html('电脑（用品）');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subcomputer'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '5':{
			for(var i=0;i<5;i++){
				$("div.nav-right ul li a").eq(i).removeClass('on');
			}
			$("div.nav-right ul li a").eq(1).addClass('on');
			$("div.cla-subTitle").html('出售');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showsell'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){     
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '6':{
			for(var i=0;i<5;i++){
				$("div.nav-right ul li a").eq(i).removeClass('on');
			}
			$("div.nav-right ul li a").eq(2).addClass('on');
			$("div.cla-subTitle").html('求购');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showbuy'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '7':{
			for(var i=0;i<5;i++){
				$("div.nav-right ul li a").eq(i).removeClass('on');
			}
			$("div.nav-right ul li a").eq(3).addClass('on');
			$("div.cla-subTitle").html('出租');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showrent'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '8':{
			for(var i=0;i<5;i++){
				$("div.nav-right ul li a").eq(i).removeClass('on');
			}
			$("div.nav-right ul li a").eq(4).addClass('on');
			$("div.cla-subTitle").html('找租');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showsrent'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '9':{
			$("div.cla-subTitle").html('搜索信息');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,name:$.cookie('INFO'),request:'search'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 console.log(datas.num);
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '4':
		default:{
			$("div.cla-subTitle").html('其他物品');
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subother'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
	}
}

function getpagedata(){
	switch($.cookie('CLASSIFY')){
		case '11':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subbook'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '12':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'substudy'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '13':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'suboffice'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '21':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'sublife'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '22':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subem'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '31':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subphone'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '32':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subdigit'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '33':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subcomputer'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '5':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showsell'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '6':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showbuy'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '7':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showrent'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '8':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'showsrent'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '9':{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,name:$.cookie('INFO'),request:'search'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
		case '4':
		default:{
			$.ajax({
				type:"POST",
				dataType:"json",
				url:"../control/showgood.php",
				data:{pageId:pageid,request:'subother'},
				error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
			 },
			 success:function(datas){
				 var html='';
				 for(var i=0;i<datas.num;i++){
					 html+='<div class="cla-item"><a href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl" src="'+datas.data[i].goodImg+'"><p class="cla-itemName">'+datas.data[i].goodName+'</p></br><p class="cla-des">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p></br><p class="cla-des">类别：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></br><p class="cla-des">上架时间：<span class="cla-descon">'+datas.data[i].ReleaseTime+'</span></p></br><p class="cla-des">结束状态：<span class="cla-descon">'+datas.data[i].ifFinish+'</span></p></br></a></div>';
				 }
				 $("div.cla-item-list").html(html);
				 html='';
				 pgnum='第&nbsp;'+pageid+'&nbsp;页';
				 if(pageid==1){
					 html+='';
				 }else{
					 html+='<a id="pageprev" href="javascript:;" onClick="pageid-=1;getpagedata()">上一页</a>';
				 }
				 html+='<a id="pagenum" style="cursor:default">'+pgnum+'</a>';
				 if(datas.finish=='0'){
					 html+='<a id="pagenext" href="javascript:;" onClick="pageid+=1;getpagedata()">下一页</a>';
				 }else{
					 html+='';
				 }
				 $("div.page").html(html);
			 }
			});
			break;
		}
	}
}

function getconcern(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../control/showgood.php",
		data:{request:'subconcern'},
		error: function(XMLHttpRequest, textStatus, errorThrown){  
				console.log('XMLHttpRequest.readyState'+XMLHttpRequest.readyState);
				console.log('XMLHttpRequest.status'+XMLHttpRequest.status);
				console.log('XMLHttpRequest.responseText'+XMLHttpRequest.responseText);
		},
		success:function(datas){
			var html='<h3 class="subcla-contitle">大家都在关注...</h3>';
			for(var i=0;i<4;i++){
				html+='<a class="subcla-conitem fl" href="good.html" onClick="itemid='+datas.data[i].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl subcla-conimg" src="'+datas.data[i].goodImg+'"><p class="subcla-conintro">'+datas.data[i].goodName+'</p><p class="subcla-conintro">价格：<span class="cla-descon">'+datas.data[i].goodPrice+'</span></p><p class="subcla-conintro">类型：<span class="cla-descon">'+datas.data[i].goodType+'</span></p></a>';
			}
			html+='<a class="subcla-conitem fl subcla-lastconitem" href="good.html" onClick="itemid='+datas.data[4].goodId+";$.cookie('ITEMID',itemid);"+'"><img class="fl subcla-conimg" src="'+datas.data[4].goodImg+'"><p class="subcla-conintro">'+datas.data[4].goodName+'</p><p class="subcla-conintro">价格：<span class="cla-descon">'+datas.data[4].goodPrice+'</span></p><p class="subcla-conintro">类型：<span class="cla-descon">'+datas.data[4].goodType+'</span></p></a>';
			$("div.subcla-concern").html(html);
		}
	});
}