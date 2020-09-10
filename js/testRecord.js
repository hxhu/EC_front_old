$(function(){
	let server=window.globalConfig.url;
	var token=sessionStorage.getItem("token");

	$.ajax({
	    type: "POST",
	    url: server+"/dlplatform/api/dlplatform/searchTestRecord",
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
	        		var index=datas[i].testTime.indexOf('T');//找到T第一次出现的位置，用来截取时间
	        		var time=datas[i].testTime.substring(0,index);
	        		str +="<tr style='height: 50px;' align='center'>";
	        		str += "<td>" +(i+1)+"</td>";
	        		str += "<td>" +datas[i].testName+ "</td>";
	        		str += "<td>" +time+ "</td>";
	        		str += "<td>" +datas[i].network+ "</td>";
	        		str += "<td>" +datas[i].testsetName+ "</td>";
	        		str += "<td>" +datas[i].modelName+ "</td>";
	        		str += "<td>" +datas[i].threshold+ "</td>";
	        		str += "<td>" +"<button type='button' class='layui-btn layui-btn-sm  btn1'  id='" + datas[i].testId + "'>" + "查看" + "</button>"+ "<button type='button' class='layui-btn layui-btn-sm layui-btn-danger btn2'  id='" + datas[i].testId + "'>" + "删除" + "</button>"+"</td>";
	        		str += "</tr>";
	        	}
	        	$("#information").append(str);
	        	$('#information').find('tr:odd').css('background-color','LemonChiffon');

	        	//删除检测记录
	        	$('.btn2').on('click',function(){
					var id=$(this).attr("id");
					let arr={};
		        	arr={
		               testId:id
		            };//先不改成表单
		            arr =JSON.stringify(arr);
            		$.param(arr);
					$.ajax({
						type: "POST",
						url: server+"/dlplatform/api/dlplatform/deleteTestRecord",
						dataType: "json",
                    	contentType:"application/json",
						beforeSend: function (request) {
						    request.setRequestHeader("Content-token", token);
						},
						data:arr,
						success:function(data){
							if(data.code==2000){
								alert('删除成功！');
								$(".btn2[id=" + id + "]").parent().parent().remove();
							}else if(data.code==5500){
								alert('操作失败！');
							}
            			     
         				},
	         			error:function(){
	         				alert("删除失败！");	
	         			},
					})

	        	})

	        	//查看检测结果
	        	$('.btn1').on('click',function(){
	        		var id=$(this).attr("id");
	        		sessionStorage.setItem("testId",id);
	        		window.location.href="检测结果显示.html";
	        	})



	        }
	    },
	    error:function(){  
			alert("查询失败，请重试！");  
		}  	
	});

	
})

