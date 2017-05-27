
require(['../../config'],function(){
	require(['jquery','swiper','template','layer','iscroll','fastclick'],function($,swiper,template,layer,IScroll,fastclick){
		layer.config({
			path:"js/plug/layer/"
		})
		$(function(){
			fastclick.attach(document.body);
			$('footer').load("commen.html");
			var sum=0;
			var arr=[];
			var userid=window.localStorage.getItem('userId');
			var str='';
			$.getJSON('http://datainfo.duapp.com/shopdata/getCar.php?callback=?',{userID:userid},function(data){
				layer.load(3);
				console.log(data);
				arr=data;
				$('.product-item .amount').html(data.length);
				/*$('.product-item .price')*/
				for(var i=0;i<data.length;i++){
					str+=`<dl data-id="${data[i].goodsID}">
							<dt><img src="${data[i].goodsListImg}"></dt>
							<dd class='pro-item'>
								<div class="goodsName">${data[i].goodsName}</div>
								<div class="price">单价:￥<span>${data[i].price}</span></div>
								<div class="number">
									数量:<input type="button" value="-" class="decrease">
										<input type="text" name="" class="txt" value="${data[i].number}" disabled>
										<input type="button" value="+" class="increase">
								</div>
							</dd>
							<a href="javascript:;" class="iconfont">&#xe636;</a>
						</dl>`;
					sum+=(parseFloat(data[i].price)*parseFloat(data[i].number));
				}
				$('.product-item .price').html(sum.toFixed(2));
				layer.closeAll();
				$('.product').html(str);
				handleCart.init();
			});

			var handleCart={
				input:$('.txt'),
				totalprice:$('.product-item .price'),
				amount:$('.product-item .amount'),
				init:function(){
					this.increase();
					this.decrease();
					this.delete();
				},
				increase:function(){
					console.log(1);
					$('.number').on('click','.increase',function(){
						var  num=$(this).prev().val();
						num++;
						$(this).prev().val(num);
						sum+=parseFloat($(this).parents('.pro-item').find('.price span').html());
						$('.product-item .price').html(sum.toFixed(2));
					})
				},
				decrease:function(){
					$('.number').on('click','.decrease',function(){
						var num=$(this).next().val();
						if(num<=1)
							return;
						num--;
						$(this).next().val(num);
						sum-=parseFloat($(this).parents('.pro-item').find('.price span').html());
						$('.product-item .price').html(sum.toFixed(2));
					})
				},
				delete:function(){
					var length=arr.length;
					console.log(length);
					$('dl').on('click','a',function(){
						var id=$(this).parents('dl').data('id');
						console.log(id);
						var s=parseFloat($(this).parents('dl').find('.price span').html());
						var t=parseFloat($(this).parents('dl').find('.txt').val());
						sum-=s*t;
						length--;
						$('.product-item .amount').html(length);
						$('.product-item .price').html(sum.toFixed(2));
						$(this).parent().remove();
						$.getJSON('http://datainfo.duapp.com/shopdata/updatecar.php?',
							{userID:userid,goodsID:id,number:0},function(data){
								console.log(data);
								if(data==1){
									layer.confirm('删除成功');
								}
							})
					})
				}
			}

		})

	})
})