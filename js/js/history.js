require(['../../config'],function(){
    
    require(['jquery','iscroll','layer'],function($,IScroll,layer){
    		layer.config({
			path:"js/plug/layer/"
		})
    		
    	$(function(){
            $('footer').load("commen.html");
    		var data=JSON.parse(window.localStorage.getItem('prohistory'));
    		console.log(data);
    		var str='';
    		for(var i=0;i<data.length;i++){
    			str+=`<li>
							<img data-goodsID="${data[i].goodsID}" src="${data[i].goodsListImg}">
							<p>${data[i].goodsName}</p>
							<p class="p2">￥${data[i].price}</p>
						</li>`
    		}
    		$('.prodoct').html(str);
    	})

   })
})