$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");
	var analyzeRecordId=sessionStorage.getItem("analyzeRecordId");
	let arr={};
    arr={
        analyzeRecordId:analyzeRecordId
    };//先不改成表单
    arr =JSON.stringify(arr);
    $.param(arr);
	$.ajax({
		type:"post",
		url: server+"/dlplatform/api/dlplatform/searchAnalyzeResult", 
		beforeSend: function (request) {
		    request.setRequestHeader("Content-token", token);
		},
		dataType: "json",
        contentType:"application/json",
        data:arr,
		success:function(data){
			if(data.code==2000){
				var datas=data.data;
			    var analyzeRecordName=datas.analyzeRecordName;
			    var type=datas.type;
			    var index=datas.analyzeRecordTime.indexOf('T');//找到T第一次出现的位置，用来截取时间
	        	var time=datas.analyzeRecordTime.substring(0,index);
			    var network=datas.network;
			    var trainName=datas.trainName;
			    $('#analyzeRecordName').html(analyzeRecordName);
			    $('#type').html(type);
			    $('#analyzeRecordTime').html(time);
			    $('#network').html(network);
			    $('#trainName').html(trainName);
			    var row={};
				row={
				    analyzeRecordId:analyzeRecordId
				};//先不改成表单
				row =JSON.stringify(row);
				$.param(row);
			    var url = server+"/dlplatform/api/dlplatform/showAnalyzeResult";
		        var xhr = new XMLHttpRequest();
		        xhr.open('post',url, true);
		        xhr.responseType = "blob";
		        xhr.setRequestHeader("Content-token",token);
		        xhr.setRequestHeader("Content-Type", "application/json");
		        xhr.send(row);
		        xhr.onload = function() {
		            var blob = this.response;
		            var img = document.createElement("img");
		            img.onload = function(e) {
		                window.URL.revokeObjectURL(img.src); 
		            };
		            img.src = window.URL.createObjectURL(blob);
		            $("#img").append(img);    
		              
		        }
		        //下载图片
		        // $('#u134').on('click',function(){
		        // 	var img = $('#img').find('img'); // 获取要下载的图片

			       //  var url = img.src;                         // 获取图片地址
			        
			       //  var a = document.createElement('a');          // 创建一个a节点插入的document
			       //  var event = new MouseEvent('click')           // 模拟鼠标click点击事件
			       //  a.download = 'beautifulGirl'                  // 设置a节点的download属性值
			       //  a.href = url;                                 // 将图片的src赋值给a节点的href
			       //  a.dispatchEvent(event)                        // 触发鼠标点击事件
		        // })



		     



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
		window.location.href="评估记录.html";
		// window.history.go(-1);
	})


})


