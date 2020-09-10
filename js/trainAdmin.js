$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");

	$.ajax({
	    type: "POST",
	    url: server+"/dlplatform/api/dlplatform/searchTrainset",
	    contentType: "application/x-www-form-urlencoded",
	    beforeSend: function (request) {
	        request.setRequestHeader("Content-token", token);
	    },
	    success: function (data) {
	        if(data.code==5510){
	        	alert('用户还没有上传任何训练集！');
	        }else if(data.code==2000){
	        	var str=""
	        	var datas=data.data;
	        	for(var i=0;i<datas.length;i++){
	        		var index=datas[i].trainsetTime.indexOf('T');//找到T第一次出现的位置，用来截取时间
	        		var time=datas[i].trainsetTime.substring(0,index);
	        		str +="<tr style='height: 50px;' align='center'>";
	        		str += "<td>" +(i+1)+"</td>";
	        		str += "<td>" +datas[i].trainsetName+ "</td>";
	        		str += "<td>" +time+ "</td>";
	        		str += "<td>" +datas[i].classNum+ "</td>";
	        		str += "<td>" +datas[i].description+ "</td>";
	        		str += "<td>" +"<button type='button' class='layui-btn layui-btn-sm layui-btn-danger btn2'  id='" + datas[i].trainsetId + "'>" + "删除" + "</button>"+ "</td>";
	        		str += "</tr>";
	        	}
	        	$("#information").append(str);
	        	$('#information').find('tr:odd').css('background-color','LemonChiffon');

	        	//删除操作
	        	$('button').on('click',function(){
					var id=$(this).attr("id");
					let arr={};
		        	arr={
		               trainsetId:id
		            };//先不改成表单
		            arr =JSON.stringify(arr);
            		$.param(arr);
					$.ajax({
						type: "POST",
						url: server+"/dlplatform/api/dlplatform/deleteTrainset",
						dataType: "json",
                    	contentType:"application/json",
						beforeSend: function (request) {
						    request.setRequestHeader("Content-token", token);
						},
						data:arr,
						success:function(data){
							if(data.code==2000){
								alert('删除成功！');
								$("button[id=" + id + "]").parent().parent().remove();
							}else if(data.code==5500){
								alert('操作失败！');
							}
            			     
         				},
	         			error:function(){
	         				alert("删除失败！");	
	         			},
					})

	        	})
	        }
	    },
	    error:function(){  
			alert("查询失败，请重试！");  
		}  	
	});

	

	
})
