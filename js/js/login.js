

require(['../../config'],function(){
    
    require(['jquery','fastclick','layer'],function($,fastclick,layer){
         console.log(layer);
         layer.config({
            path:"js/plug/layer/"
        })
        var  history=JSON.parse(localStorage.getItem("count")||'{}');
        if(history.userID){
             $.get("http://datainfo.duapp.com/shopdata/userinfo.php?status=login",
                      {userID:history.userID,password:history.possword},function(data){
                     window.location.href="list.html";   
             })
        }
         
        $("#cview").change(function(){
           //判断选中状态显示/隐藏密码
          if(this.checked){
               $("#pwd").attr("type","text")      
          }else{
            $("#pwd").attr("type","password");    
          }
        })
       

        $(".conlogin").click(function(){
          var unm=$("#uname").val();
            var pwd=$("#pwd").val();
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php?status=login",{userID:unm,password:pwd},function(data){
                var data=JSON.parse(data);
                console.log(data);
                 if(data.userID){
                    console.log($("#rember").prop("checked"));
                     localStorage.setItem("userId",data.userID);
                    //判断是否把密码存储到本地
                    if($("#rember").prop("checked")){
                        var str={userID:unm,possword:pwd};
                        str=JSON.stringify(str);
                        localStorage.setItem("count",str);
                    }else{
                        localStorage.removeItem("count");
                    }
                  window.location.href="list.html";
                 }else{
                      layer.alert('用户名密码错误');
                 }
            })
        })

        //注册
        $('.conregis').click(function(){
            window.location.href="register.html";
        })
    })

})