/**
 * 
 * @authors zl (you@example.org)
 * @date    2020-03-03 09:40:58
 * @version $Id$
 */
$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");

	var trainName;
	var network;
	var gpus
	var trainsetId;
	var description;

	//获取网络列表
	$.ajax({
		type: "POST",
	    url: server+"/dlplatform/api/dlplatform/getTrainNetwork",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success:function(data){
	    	if(data.code==2000){
	    		var datas=data.data;
	    		var str="";
	    		for(var i=0;i<datas.length;i++){
	    			str+="<option value='" + datas[i]+"'>"+ datas[i]+"</option>";
	    		}
	    		$('#u175').find('select').append(str);

	    		
	    	}else{
	    		alert("获取网络列表失败！");
	    	}
	    },
	    error:function(){
	    	alert("获取网络列表失败！");
	    }
	})	
	//获取训练集列表
	$.ajax({
		type: "POST",
	    url: server+"/dlplatform/api/dlplatform/getTrainsetName",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success:function(data){
	    	if(data.code==2000){
	    		var datas=data.data;
	    		var str="";
	    		for(var i=0;i<datas.length;i++){
	    			str+="<option value='" + datas[i].trainsetId+"'>"+ datas[i].trainsetName+"</option>";
	    		}
	    		$('#u173').find('select').append(str);

	    		
	    	}else{
	    		alert("获取训练集列表失败！");
	    	}
	    },
	    error:function(){
	    	alert("获取训练集列表失败！");
	    }
	})	

	//提交模型训练信息
	$('#u164').on('click',function(){
		trainName=$('#u177_input').val();//训练名
		network=$("#u175_input option:selected").val();
		trainsetId=$("#u173_input option:selected").val();
		gpus =$("#u174_input option:selected").val();
		description=$('#u165_input').val();//训练说明
		

		if(trainName==""||network==""||trainsetId==""||gpus==""||description==""){
			alert("必填项不能为空！")
		}else{
			let arr={};
		    arr={
		        trainName:trainName,
		        network:network,
		        trainsetId:trainsetId,
		        gpus:gpus,
		        description:description,
		    };//先不改成表单
		    arr =JSON.stringify(arr);
		    $.param(arr);
		    $.ajax({
				type: "POST",
			    url: server+"/dlplatform/api/dlplatform/submitTrainMessage",
			    beforeSend: function (request) {
			        request.setRequestHeader("Content-token", token);
			    },
			    dataType: "json",
	        	contentType:"application/json",
	        	data:arr,
	        	success:function(data){
	        		if(data.code==2000){
	        			var trainId=data.data.trainId;
	        			sessionStorage.setItem("trainId",trainId);
	        			window.location.href="超参数设置内容.html"
	        		}else{
	        			alert("模型训练信息提交失败！")
	        		}
	        	},
	        	error:function(){
	        		alert("模型训练信息提交失败！")
	        	}
	        })
		}
		
	})
	
	
})
