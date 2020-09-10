$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");
	//提交
	$("#u290").on("click",function(){
		var testsetName=$("#u292_input").val();
		var description=$("#u291_input").val();
		var file=$('#file').val();
		var data = new FormData($('#form1')[0]);
		if(testsetName==""||description==""||file==""){
			alert('有未填写的信息，请补充完善！');
		}else{
			$.ajax({
			    url: server+"/dlplatform/api/dlplatform/uploadComplete", 
			    beforeSend: function (request) {
		        	request.setRequestHeader("Content-token", token);
		    	},
			    type: 'POST',
			    data: data,
			    dataType: 'JSON',
			    cache: false,
			    processData: false,
			    contentType: false,
			    success:function(data){
			        if(data.code==2000){
			        	alert('上传成功！');
			        }else{
			        	alert("上传失败！");
			        }
			    },  
			    error:function(){  
			        alert("请求失败，请重试！");  
			    }  	
			});
		}
		
	})
	
})

