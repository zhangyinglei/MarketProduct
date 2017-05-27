

require(['../../config'],function(){
    
    require(['jquery','fastclick','layer'],function($,fastclick,layer){
          layer.config({
            path:"js/plug/layer/"
        })
        //用户名合法验证
        $('.uname').blur(function(){
            var uname=$(this).val();
            var zenm =/^[a-zA-Z0-9_]\w{5,11}$/;
            if(!zenm.test(uname)){
                $(".nmerr").css("display","block");
                return;
            }else{
                 $(".nmerr").css("display","none");
            }
        })
        //密码合法验证
         $('.upwd').blur(function(){
            var upwd=$(this).val();
            var zwpwd=/^[a-zA-Z0-9_]{6,12}$/;
            if(!zwpwd.test(upwd)){
                $(".pwderr").css("display","block");
                return;
            }else{
                 $(".pwderr").css("display","none");
            }
        })
         $('.upwds').blur(function(){
            var upwds=$(this).val();
            var upwd=$('.upwd').val();
            if(upwds!=upwd){
                $(".pwdserr").css("display","block");
                return;
            }else{
                 $(".pwdserr").css("display","none");
            }
        })

         $(".conregis").click(function(){
             var uname=$('.uname').val();
             var upwd=$('.upwd').val();
 
              $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:'register',userID:uname,password:upwd},function(data){
                  if(data==1){
                    alert("注册成功");
                    localStorage.setItem("userId",uname);
                    window.location.href="list.html";
                  }else{
                    layer.alert('用户名已被注册');
                  }
              })
         })


    })

})