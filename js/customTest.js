/**
 * 
 * @authors zxh (you@example.org)
 * @date    2019-12-18 09:40:58
 * @version $Id$
 */
$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");

	var testName;
	var testNetwork;
	var modelId;
	var testsetId;
	var threshold;
	var label=[];
	//获取网络列表
	$.ajax({
		type: "POST",
	    url: server+"/dlplatform/api/dlplatform/getOptionNetwork",
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
	//获取检测集列表
	$.ajax({
		type: "POST",
	    url: server+"/dlplatform/api/dlplatform/getOptionTestset",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success:function(data){
	    	if(data.code==2000){
	    		var datas=data.data;
	    		var str="";
	    		for(var i=0;i<datas.length;i++){
	    			str+="<option value='" + datas[i].id+"'>"+ datas[i].name+"</option>";
	    		}
	    		$('#u174').find('select').append(str);

	    		
	    	}else{
	    		alert("获取检测集列表失败！");
	    	}
	    },
	    error:function(){
	    	alert("获取检测集列表失败！");
	    }
	})	

	$('#u175_input').change(function(){
		var options = $("#u175_input option:selected");
		testNetwork=options.val();
		let arr={};
	    arr={
	        testNetwork:testNetwork
	    };//先不改成表单
	    arr =JSON.stringify(arr);
	    $.param(arr);
		$.ajax({
			type: "POST",
		    url: server+"/dlplatform/api/dlplatform/getOptionModel",
		    beforeSend: function (request) {
		        request.setRequestHeader("Content-token", token);
		    },
		    dataType: "json",
        	contentType:"application/json",
        	data:arr,
        	success:function(data){
		    	if(data.code==2000){
		    		var datas=data.data;
		    		var str="";
		    		str+="<option value='' hidden='true'></option>";
		    		for(var i=0;i<datas.length;i++){
		    			str+="<option value='" + datas[i].id+"'>"+ datas[i].name+"</option>";
		    		}
		    		$('#u173').find('select').html(str);

		    		
		    	}else{
		    		alert("获取检测模型失败！");
		    	}
		    },
		    error:function(){
		    	alert("获取检测模型失败！");
		    }
		})
	})
	//标签值变化
	$('#u173_input').change(function(){
		var options = $("#u173_input option:selected");
		modelId=options.val();
		let arr={};
	    arr={
	        modelId:modelId
	    };//先不改成表单
	    arr =JSON.stringify(arr);
	    $.param(arr);
	    $.ajax({
			type: "POST",
		    url: server+"/dlplatform/api/dlplatform/getOptionTestLabel",
		    beforeSend: function (request) {
		        request.setRequestHeader("Content-token", token);
		    },
		    dataType: "json",
        	contentType:"application/json",
        	data:arr,
        	success:function(data){
		    	if(data.code==2000){
		    		var datas=data.data;
		    		var labelArr=datas[0].split(",");
		    		var str="";
		    		for(var i=0;i<labelArr.length;i++){
		    			str+="<input type='checkbox' name='food' value='"+labelArr[i]+"' id='"+labelArr[i]+"'>"+"<label class='menu' for='"+labelArr[i]+"'></label>"+labelArr[i];
		    		}
		    		$('#u166').html(str);		    		
		    	}else{
		    		alert("获取标签失败！");
		    	}
		    },
		    error:function(){
		    	alert("获取标签失败！");
		    }
		})

	})
	//开始检测
	
	$('#u164').on('click',function(){
		testName=$('#u177_input').val();//检测名
		threshold=$('#u165_input').val();//阈值
		testsetId=$("#u174_input option:selected").val();
		$('input[name="food"]:checked').each(function(){
     		label.push($(this).val());
    	});
    	var str1=label.join(',');

		if(modelId==""||testName==""||testsetId==""||testNetwork==""||threshold==""||str1==""){
			alert("必填项不能为空！")
		}else{
			let arr={};
		    arr={
		        modelId:modelId,
		        testName:testName,
		        testsetId:testsetId,
		        testNetwork:testNetwork,
		        threshold:threshold,
		        label:str1
		    };//先不改成表单
		    arr =JSON.stringify(arr);
		    $.param(arr);
		    $.ajax({
				type: "POST",
			    url: server+"/dlplatform/api/dlplatform/addTestRecord",
			    beforeSend: function (request) {
			        request.setRequestHeader("Content-token", token);
			    },
			    dataType: "json",
	        	contentType:"application/json",
	        	data:arr,
	        	success:function(data){
	        		if(data.code==2000){
	        			var testId=data.data.testId;
	        			sessionStorage.setItem("testId",testId);
	        			window.location.href="检测结果显示.html"
	        		}else{
	        			alert("检测失败！")
	        		}
	        	},
	        	error:function(){
	        		alert("检测失败！")
	        	}
	        })
		}
		
	})
	
	
})
