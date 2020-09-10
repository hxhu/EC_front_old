/**
 * 
 * @authors zxh (you@example.org)
 * @date    2019-12-18 17:24:52
 * @version $Id$
 */

$(function() {
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");
	var analyzeName;
	$.ajax({
		type: "POST",
	    url: server+"/dlplatform/api/dlplatform/getTrainRecord",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success:function(data){
	    	if(data.code==2000){
	    		var datas=data.data;
	    		var str="";
	    		for(var i=0;i<datas.length;i++){
	    			str+="<option value='" + datas[i].trainId+"' logId='"+ datas[i].logId+"'>"+ datas[i].trainName+"</option>";
	    		}
	    		$('#u236').find('select').append(str);

	    		
	    	}else{
	    		alert("获取训练名列表失败！");
	    	}
	    },
	    error:function(){
	    	alert("获取训练名列表失败！");
	    }
	})

	//开始检测(创建评估记录)
	$('#u238').on('click',function(){
		var analyzeName=$('#u237_input').val();
		var trainId = $("#u236_input option:selected").val();
		var logId=$("#u236_input option:selected").attr("logId");
		var type=$("input[name='model']:checked").val();

		if(analyzeName==""||trainId==""||logId==""||type==""){
			alert("必填项不能为空！")
		}else{
			let arr={};
		    arr={
		        analyzeName:analyzeName,
		        trainId:trainId,
		        logId:logId,
		        type:type
		    };//先不改成表单
		    arr =JSON.stringify(arr);
		    $.param(arr);
		    $.ajax({
				type: "POST",
			    url: server+"/dlplatform/api/dlplatform/createAnalyze",
			    beforeSend: function (request) {
			        request.setRequestHeader("Content-token", token);
			    },
			    dataType: "json",
	        	contentType:"application/json",
	        	data:arr,
	        	success:function(data){
	        		if(data.code==2000){
	        			var analyzeRecordId=data.data.analyzeRecordId;
	        			sessionStorage.setItem("analyzeRecordId",analyzeRecordId);
	        			window.location.href="评估结果显示.html"
	        		}else{
	        			alert("评估失败！")
	        		}
	        	},
	        	error:function(){
	        		alert("评估失败！")
	        	}
	        })
		}

	})
})