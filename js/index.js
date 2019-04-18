/*
* @Author: TAO
* @Date:   2018-11-10 18:18:11
* @Last Modified by:   TAO
* @Last Modified time: 2018-11-10 19:41:05
*/

'use strict';



// 电影top250
$(function(){

	$.ajax({
		url:"https://api.douban.com/v2/movie/top250?start=0&count=10",
		dataType:"jsonp",
		success:function(data){
			// console.log(data);
			var title = data.title; // 标题
			var lists = data.subjects; //数据

			var str = "";
			for(var i = 0; i < lists.length;i++){
				str+= '<div class="media">';
				str+= '<div class="media-left">';
				str+= '<a href="#">';
				str+= '<img class="media-object" data-src="holder.js/64x64" alt="64x64" src="' + lists[i].images.small + '" data-holder-rendered="true" style="width: 100px; height: 100px;">';
				str+= '</a>';
				str+= '</div>';
				str+= '<div class="media-body">';
				str+= '<h4 class="media-heading">' + lists[i].title + '</h4>';
				str+= lists[i].genres.join(",");
				str+= '<p><a href="' + lists[i].alt + '" class="btn btn-default">链接</a></p></div>';
				str+= '</div>';
			}
			
			$("#top250").find("h1").text(title).parent().append(str);
		}
	})



})

// 正在热映
$(function(){

	$.ajax({
		url:"https://api.douban.com/v2/movie/in_theaters",
		data:{"city":"广州","start":0,"count":12},
		dataType:"jsonp",
		success:function(data){
			console.log(data);
            // 先清空所有内容
            var lists = data.subjects;

            for(var key in lists){

            	var str = '';
            	str += '<div class="col-sm-6 col-md-4">';
            	str += '<div class="thumbnail">';
            	str += '<img alt="100%x200" src="' + lists[key].images.medium + '"  style="height: 300px; width: 100%; display: block;">';
            	str += '<div class="caption">';
            	str += '<h3>' + lists[key].title + '</h3>';
            	str += '<h4>' + lists[key].genres.join(',') + '</h4>';
            	str += '<p><a href="' + lists[key].alt +'" class="btn btn-primary"  target="_blank" role="button">豆瓣详细链接</a> </p>';
            	str += '</div>';
            	str += '</div>';
            	str += '</div>';

            	$("#MovieList").append(str);
            }
        }
    })

})