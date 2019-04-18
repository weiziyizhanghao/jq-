/*
* @Author: TAO
* @Date:   2018-11-12 16:25:19
* @Last Modified by:   TAO
* @Last Modified time: 2018-11-12 17:05:38
*/

'use strict';



	var optionsAjaxData = {
				city:"广州",
				start:0,   //起始位置
				count:10,
			};

	// 默认请求数据
	getMovieAjaxData(optionsAjaxData);

	// 搜索功能
	$("#search").click(function(){
		var val =$("#searchInput").val();
		if(val == "请输入城市..."){
			return false;
		}
		optionsAjaxData.city = val;
		getMovieAjaxData(optionsAjaxData);
	})


	//分页功能
	$(".pagination li").click(function(){
		var i = $(this).index();
		var len = $(".pagination li").length;
		// console.log(i);
		//1-5按钮
		if(i != 0 && i!= len-1){
			optionsAjaxData.start = (i-1)*10;
			getMovieAjaxData(optionsAjaxData);

		}
		// 下一页功能
		if(i == len-1){
			optionsAjaxData.start += 10;
			getMovieAjaxData(optionsAjaxData);
		}
		// 上一页功能
		if(i == 0){
			optionsAjaxData.start -= 10;
			optionsAjaxData.start >= 0 ? optionsAjaxData.start : optionsAjaxData.start=0;
			getMovieAjaxData(optionsAjaxData);
		}
	})


	function getMovieAjaxData(options){
		$.ajax({
			url:"https://api.douban.com/v2/movie/in_theaters",
			data:options,
			dataType:"jsonp",
			success:function(data){
				getMovieData(data);
			}
		})
		
	}


	function getMovieData(data){
		console.log(data);

		var title = data.title;//标题
		var lists = data.subjects;//数据

		//没有数据时中断
		if(lists.length < 2){
			$("#hotlists").empty().html("<h1>没有数据。。。</h1>");
			return false;
		}

		$(".page-header h3").text(title);
		var str = "";

		for(var i = 0 ;i < lists.length;i++){
			str += '<div class="col-sm-6 col-md-4">';
			str += '<div class="thumbnail">';
			str += '<img data-src="holder.js/100%x200" alt="100%x200" src="' + lists[i].images.small + '" data-holder-rendered="true" style="height: 200px; display: block;">';
			str += '<div class="caption">';
			str += '<h3>' + lists[i].title + '</h3>';
			str += '<h4>' + lists[i].original_title + '</h4>';
			str += '<p>评价：' + lists[i].genres.join(",") + '</p>';
			str += '<p>类型：' + lists[i].rating.average + '</p>';
			str += '<p><a href="subject.html?id=' + lists[i].id + '" class="btn btn-primary" role="button">链接</a></p>';
			str += '</div></div></div>';
		}

		$("#hotlists").empty().append(str);

	}