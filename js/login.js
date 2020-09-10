$(function(){
	let server=window.globalConfig.url;
	var type=2;
	//登录函数
	$("#login").click(function(){
		var username;
        var password;

        username=$("#u8_input").val();
        password=$("#u9_input").val();

        if(username.length<=0||password.length<=0){
            alert("用户名和密码不能为空！");
            clean();
        }else{
        	let arr={};
        	arr={
               cellPhone:username,
               password:password,
               userType:type
            };//先不改成表单
         	arr =JSON.stringify(arr);
            $.param(arr);

            $.ajax({
         			type:"post",  
                    url:server+"/dlplatform/api/dlplatform/login", 
                    dataType: "json",
                    contentType:"application/json",
                    data:arr,
         			success:function(data,textStatus,request){
            			   var code1=data.code;
            			   code1=JSON.stringify(code1);//请求的状态码
            			   console.log(code1);
            			    if(code1==2000){
            					alert("登陆成功！");   
                                var token= request.getResponseHeader("Access-token");
                                sessionStorage.setItem("token",token);
                                window.location.href="index.html";
            				}else{
            					console.log(2);
            			        var message=data.msg;
                                alert(message);          			     	
            				}                         
         			},
         			error:function(){
         				alert("登录请求失败，请刷新页面！");
         				window.location.reload();
         			},
         	  })
        }

	})

	$("#newUser").click(function(){
		clean();
		$("#u1_state0").css("visibility","hidden");
		$("#u1_state1").css("visibility","visible");
	})

	$("#oldUser").click(function(){
		clean1();
		$("#u1_state0").css("visibility","visible");
		$("#u1_state1").css("visibility","hidden");
	})
	//注册函数
	$("#register").click(function(){
		var userName;
        var password;
        var cellPhone;

        userName=$("#u33_input").val();
        password=$("#u24_input").val();
        cellPhone=$("#u22_input").val();

        if(userName.length<=0||password.length<=0||cellPhone.length<=0){
            alert("用户名、密码和手机号不能为空！");
        }else{
        	let arr={};
        	arr={
               userName:userName,
               cellPhone:cellPhone,
               password:password
            };//先不改成表单
         	arr =JSON.stringify(arr);
            $.param(arr);

            $.ajax({
         			type:"post",  
                    url:server+"/dlplatform/api/dlplatform/register", 
                    dataType: "json",
                    contentType:"application/json",
                    data:arr,
         			success:function(data){
            			   var code1=data.code;
            			   code1=JSON.stringify(code1);//请求的状态码
            			   console.log(code1);
            			    if(code1==2000){
            					alert("注册成功,返回登录界面！");
            					$("#u1_state0").css("visibility","visible");
								$("#u1_state1").css("visibility","hidden");
            				}else{
            					console.log(2);
            			        var message=data.msg;
                                alert(message);          			     	
            				}                         
         			},
         			error:function(){
         				alert("登录请求失败，请刷新页面！");
         				window.location.reload();
         			},
         	  })
        }

	})


	function clean(){
        $("#u8_input").val("");//清空用户名和密码
        $("#u9_input").val("");
    }
    function clean1(){
    	$("#u33_input").val("");//清空用户名和密码
        $("#u22_input").val("");
        $("#u24_input").val("");
    }
})

