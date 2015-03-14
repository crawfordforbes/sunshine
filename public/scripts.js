// var bod = $("#content");
var news_link = $("#news");
var shows_link = $("#shows");
var pics_link = $("#pics");
var press_link = $("#press");
var videos_link = $("#videos");
var contact_link = $("#contact");
var news_wrap = $("#news_wrapper")[0];
var pics_wrap = $("#carousel_wrapper")[0];
var videos_wrap = $("#videos_wrapper")[0];
var contact_wrap = $("#contact_wrapper")[0];
var press_wrap = $("#press_wrapper")[0];
var shows_wrap = $("#shows_wrapper")[0];
var all_wraps = [news_wrap, pics_wrap, videos_wrap, contact_wrap, press_wrap, shows_wrap]
var hideAll = function(){
	all_wraps.forEach(function(item){
		item.setAttribute("class", "hidden")
	})
}

var addContent = function(content){
	content.forEach(function(item){

		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		var wrapper = $("#" + item.section + "_wrapper")[0];
		debugger
		wrapper.setAttribute("class", "")
		wrapper.appendChild(h3);
		wrapper.appendChild(p);
	});
}
	
var getContent = function(section){
	$.ajax({
		url: '/' + section,
		type: 'get',
		success: function(data){
			addContent(data)
		}
	})
}

news_link.click(function(){
	hideAll();
		if (news_wrap.innerHTML.length <= 1){
		getContent(news_link[0].id)
	} else {
		news_wrap.setAttribute("class", "")
	}	
})

shows_link.click(function(){
	hideAll();
		if (shows_wrap.innerHTML.length <= 1){
		getContent(shows_link[0].id)
	} else {
		shows_wrap.setAttribute("class", "")
	}	
})

press_link.click(function(){
	hideAll();
		if (press_wrap.innerHTML.length <= 1){
		getContent(press_link[0].id)
	} else {
		press_wrap.setAttribute("class", "")
	}	
})

videos_link.click(function(){
	hideAll();
		if (videos_wrap.innerHTML.length <= 1){
		getContent(videos_link[0].id)
	} else {
		videos_wrap.setAttribute("class", "")
	}	
})

contact_link.click(function(){
	hideAll();
		if (contact_wrap.innerHTML.length <= 1){
		getContent(contact_link[0].id)
	} else {
		contact_wrap.setAttribute("class", "")
	}	
})

var show_pics = function(pics){
	shows_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "")
	var pic_wrap = document.getElementById("pic_wrapper");
	for (var i = 0; i < pics.length; i++) {
		var divx = document.createElement('div')
		divx.setAttribute("class", "item");
		//make sure the fist div has a class of active so carousel knows where to start
		if (i === 0) {
			divx.setAttribute("class", "item active");
		};
		//creating an html object didn't go so well
		var img = "<img src='" + pics[i].url + "'>"
		pic_wrap.appendChild(divx);
		divx.innerHTML=img;
	};
}
//get pics from server
var get_pics = function(){
	$.ajax({
		url: '/pics',
		type: 'get',
		success: function(data){
			show_pics(data)
		}
	})
}

pics_link.click(function(){
	if (pics_wrap.innerHTML.length === 693){
		get_pics()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "")
	}
})

window.onload = function(){
	getContent(news_link[0].id)
};