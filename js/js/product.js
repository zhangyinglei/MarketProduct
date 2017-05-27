require(['../../config'],function(){
	require(['jquery','swiper','template','layer','fastclick'],function($,swiper,template,layer,fastclick){
		layer.config({
			path:"js/plug/layer/"
		})
		$(function(){
			fastclick.attach(document.body);
			var href=window.location.href;
			var s=href.split('?')[1];
			var id=s.split('=')[1];
			$.getJSON('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?',{goodsID:id},function(data){
				layer.load(2);
				var str='';
				console.log(data);
				var con='';
				var len=JSON.parse(data[0].imgsUrl);
				for(var i=0;i<len.length;i++){
					str+=` <div class="swiper-slide"><img src="${len[i]}"></div>`;
				}
				var s=parseInt(data[0].price)+parseInt(data[0].discount);
				console.log(s);
				con+=`<ul>
						<li>${data[0].goodsName}</li>
						<li><span class="price">￥${data[0].price}</span><i class="preprice">￥${s}</i></li>
						<li>购买人数:&nbsp;<span class="amount">${data[0].buynumber}</span></li>
					</ul>`;
				$('.swiper-wrapper').html(str);
				$('.intro').html(con);
				layer.closeAll();
				var mySwiper = new Swiper ('.swiper-container', {
			    loop: true,
			    autoplay : 3000,
			    autoplayDisableOnInteraction:false,
			    hashnav:true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    slidesPerView: 3
			});
				addCart();
			});
			function  addCart(){
				var userId=window.localStorage.getItem('userId');
				$('.c-bottom .btn').click(function(){
					$.getJSON('http://datainfo.duapp.com/shopdata/updatecar.php?',
						{userID:userId,goodsID:id},function(data){
							if(data==1){
								layer.confirm('前往购物车?',{
									btn:['继续逛逛','前往购物车']
								},function(){
									layer.closeAll();
								},function(){
									location.href='cart.html';
								})	
							}
						})
				})
			};
				
			})
		
	})
})