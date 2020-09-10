$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");
	var testId=sessionStorage.getItem("testId");
	let arr={};
    arr={
        testId:testId
    };//先不改成表单
    arr =JSON.stringify(arr);
    $.param(arr);
	$.ajax({
		type:"post",
		url: server+"/dlplatform/api/dlplatform/searchTestResult", 
		beforeSend: function (request) {
		    request.setRequestHeader("Content-token", token);
		},
		dataType: "json",
        contentType:"application/json",
        data:arr,
		success:function(data){
			if(data.code==2000){
				var datas=data.data;
			    var resultName=datas.resultName;
			    var resultTime=datas.resultTime;
			    var index=datas.resultTime.indexOf('T');//找到T第一次出现的位置，用来截取时间
	        	var time=datas.resultTime.substring(0,index);
			    var network=datas.network;
			    var modelName=datas.modelName;
			    $('#resultName').html(resultName);
			    $('#resultTime').html(time);
			    $('#network').html(network);
			    $('#modelName').html(modelName);
			    for(var i=0;i<datas.picList.length;i++){
			    	var row={};
				    row={
				        testId:testId,
				        picOne:datas.picList[i]
				    };//先不改成表单
				    row =JSON.stringify(row);
				    $.param(row);
				    console.log(row);
			   		var url = server+"/dlplatform/api/dlplatform/showTestResult";
		            var xhr = new XMLHttpRequest();
		            xhr.open('post',url,true);
		            xhr.responseType = "blob";
		            xhr.setRequestHeader("Content-token",token);
		            xhr.setRequestHeader("Content-Type", "application/json");
		            xhr.send(row);
		    
		            xhr.onload = function() {
		                // if (this.status == 200) {
		                    var blob = this.response;
		                    var img = document.createElement("img");
		                    img.onload = function(e) {
		                        window.URL.revokeObjectURL(img.src); 
		                    };
		                    img.src = window.URL.createObjectURL(blob);
		                    $("#img").append(img);    
		                // }
		            }
		            // xhr.send();

			    }


			}else{
			    alert("查看失败！");
			}
		},  
		error:function(){  
			alert("查看失败！");  
		}  	
	});

	//返回
	$('#return').on('click',function(){
		window.location.href="检测记录查看.html";
		// window.history.go(-1);
	})


})
