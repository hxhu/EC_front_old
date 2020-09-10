$(function(){
	let server=window.globalConfig.url;
	$(".li1").click(function(){
		var flag=$(this).attr("onOff");
		if(flag=="true"){
			$(this).siblings('div').hide();
			$(this).find('img').attr("src","images/index/u49.png");
			$(this).attr("onOff","false")
		}else{
			$(this).siblings('div').show();
			$(this).find('img').attr("src","images/index/u44.png");
			$(this).attr("onOff","true")
		}

	})

	$(".li2 ul li").click(function(){
		var src=$(this).attr("src");
		$('#u70_input').attr('src',src);
	})

	$(".top").click(function(){
		var src=$(this).attr("src");
		$('#u70_input').attr('src',src);
	})
})