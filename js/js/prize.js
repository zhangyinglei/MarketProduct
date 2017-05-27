require(['../../config'],function(){
	require(['jquery','swiper','template','layer','fastclick'],function($,swiper,template,layer,fastclick){
		layer.config({
			path:"js/plug/layer/"
		});
		$(function(){
		fastclick.attach(document.body);	
		var userid=window.localStorage.getItem('userId');
		var prize;
		//后退按钮

		$('.left a').click(function(){
			location.href='list.html';
		})
		$('.prize').click(function(){
			$.getJSON('http://datainfo.duapp.com/lottery/fruitsubmit.php',{userID:userid},
				function(data){
					//console.log(data);
					if(data==2){
						var arr=['一等奖:冰箱一台','二等奖:空调一台','三等奖:花1000再来','谢谢惠顾','谢谢惠顾','谢谢惠顾','谢谢惠顾','谢谢惠顾'];
						var index=parseInt(Math.random()*8);
						if(index==0){
							prize=1;
						}else if(index==2){
							prize=2;
						}else if(index==3){
							prize=3;
						}else{
							prize=0;
						}
						console.log(index);
						layer.confirm(arr[index]);
						$.getJSON('http://datainfo.duapp.com/lottery/fruitsubmit.php',{userID:userid,fruit:prize},function(result){
							if(result==1){
								return;
							}
						})
					}else if(data==0){
						layer.confirm('您已抽过奖,请不要重复抽奖');
					}else{
						return;
					}
				})
		});

		$.getJSON('http://datainfo.duapp.com/lottery/getsuerfr.php?callback=?',function(data){
			//console.log(data);
			var str=[];
			var con='';
			for(var i=0;i<data.length;i++){
				if(data[i].fruit==1){
					data[i].fruit='一等奖';
				}else if(data[i].fruit==2){
					data[i].fruit='二等奖';
				}else if(data[i].fruit==3){
					data[i].fruit="三等奖";
				}else{
					data[i].fruit='谢谢惠顾';
				}
				data[i].userID=data[i].userID.slice(0,2);
				str.push(`<li>${data[i].fruit}&nbsp;<span class="zz">${data[i].userID}...</span>&nbsp;${data[i].timer}</li>	
				     `);
			}
			console.log(str[2]);
			for(var j=0;j<str.length;j+=6){
				con+=`<div class="swiper-slide">
				    		${str[j]}${str[j+1]}${str[j+2]}${str[j+3]}${str[j+4]}${str[j+5]}
				       </div>`
			}
			$('.swiper-wrapper').html(con);
			var mySwiper = new Swiper ('.swiper-container', {
			direction: 'vertical',
		    loop: true,
		    autoplay : 3000
			});
		});

			$('.quit').click(function(){
				localStorage.clear();
				location.href='login.html';
			})
		})
	})
})