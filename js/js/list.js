

require(['../../config'],function(){
    
    require(['jquery','iscroll','layer'],function($,IScroll,layer){
    		layer.config({
			path:"js/plug/layer/"
		});
    	/*$.load(commen.html);*/
    	$(function(){
    		$('footer').load("commen.html");
	    	var userid=localStorage.getItem('userId');
	    	var arrdata=[];
	    	var prodata={};
	    	$.getJSON('http://datainfo.duapp.com/lottery/fruitsubmit.php',{userID:userid},function(data){
	    		if(data==2){
	    			layer.confirm('您好,您有一次抽奖机会',{
	    				btn:['前往抽奖','不了,谢谢']
	    			},function(){
	    				//layer.closeAll();
	    				location.href='index.html';
	    			},function(){
	    				layer.closeAll();
	    			})
	    		}
	    	})

	          var myScroll = new IScroll(".scroll-wrapper",{
			        scrollbars:true, /*是否显示滚动条*/
			        shrinkScrollbars: 'scale', /*滚动条弹性*/
			        fadeScrollbars: true,/*自动隐藏滚动条*/
			        click:true/*内容可以点击*/
			    });
	          var pageCode=0;
	          var linenumber=5;
	            var $type = $('.type');
				var $pro = $('.prodoct')
				var type = 1;
				getdata(type);
				$type.on('click','a',function(){
					type = $(this).attr('data-type');
					//console.log(type);
					$(this).addClass('color').siblings().removeClass('color');
					pageCode=0;
					getdata(type);
				})


				$pro.on('click','img',function(){
					var goodsID = $(this).attr('data-goodsID');
					console.log(goodsID);
					for(var i=0;i<arrdata.length;i++){
						if(arrdata[i].goodsID==goodsID){
							prodata=arrdata[i];
						}
					};
					console.log(prodata);
					var prohistory=JSON.parse(window.localStorage.getItem('prohistory')||'[]');
					for(var i=0;i<prohistory.length;i++){
						if(prohistory[i].goodsID==goodsID){
							prohistory.splice(i,1);
						}
					}
					prohistory.unshift(prodata);
					window.localStorage.setItem('prohistory',JSON.stringify(prohistory));

					window.location.href ="product.html?goodsID="+goodsID;
				})

				function getdata(type){
					var c=layer.load(4);
					$.getJSON('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?',{classID:type,pageCode:pageCode,linenumber:linenumber},function(data){
						arrdata=data;
						var $list = $('.prodoct');
						var str = '';
						for(var i = 0;i<data.length;i++){
							str+=`<li>
									<img data-goodsID="${data[i].goodsID}" src="${data[i].goodsListImg}">
									<p>${data[i].goodsName}</p>
									<p class="p2">￥${data[i].price}</p>
								</li>`
						}
						if(pageCode==0){
							$list.html(str);
						}
						else{
							$list.html($list.html()+str);
						}
						layer.close(c);
						myScroll.refresh();
					});
				}
				
					myScroll.on('scrollEnd',function(){
						console.log(this.y);
						console.log(this.maxScrollY);
						if(this.y==this.maxScrollY){
							pageCode++;
							getdata();
						}
					})
    	})
    	

    })

})