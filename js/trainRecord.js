$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");

	$.ajax({
	    type: "POST",
	    url: server+"/dlplatform/api/dlplatform/searchTrainRecord",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success: function (data) {
	        if(data.code==5510){
	        	alert('暂无检测结果！');
	        }else if(data.code==2000){
	        	var str=""
	        	var datas=data.data;
	        	for(var i=0;i<datas.length;i++){
	        		var index=datas[i].traintStartTime.indexOf('T');//找到T第一次出现的位置，用来截取时间
	        		var time=datas[i].traintStartTime.substring(0,index);
	        		if(datas[i].trainStatus == "stop"){
	        			var stopindex = datas[i].traintStopTime.indexOf('T');
	        		    var stopTime = datas[i].traintStopTime.substring(0,stopindex);
	        		}else{
	        			var stopTime ="--";
	        		}
	        		str +="<tr style='height: 50px;' align='center'>";
	        		str += "<td>" +(i+1)+"</td>";
	        		str += "<td>" +datas[i].trainName+ "</td>";
	        		str += "<td>" +time+ "</td>";
	        		str += "<td>" +stopTime+ "</td>";
	        		str += "<td>" +datas[i].network+ "</td>";
	        		str += "<td>" +datas[i].trainsetName+ "</td>";
	        		str += "<td>" +datas[i].trainStatus+ "</td>";
	        		str += "<td>" +"<button type='button' class='layui-btn layui-btn-sm  btn1'  id='" + datas[i].trainId + "'>" + "查看" + "</button>"+"</td>";
	        		str += "</tr>";
	        	}
	        	$("#information").append(str);
	        	$('#information').find('tr:odd').css('background-color','LemonChiffon');

	        	//查看训练情况
	        	$('.btn1').on('click',function(){
	        		var id=$(this).attr("id");
	        		sessionStorage.setItem("trainId",id);
	        		window.location.href="训练情况.html";
	        	})

	        }
	    },
	    error:function(){  
			alert("查询失败，请重试！");  
		}  	
	});

	
})

