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
// append news to the DOM
var show_news = function(news){
	shows_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "")
	news.forEach(function(item){
		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		news_wrap.appendChild(h3);
		news_wrap.appendChild(p);
	});
}

//hit the server and get news
var get_news = function(){
	$.ajax({
		url: '/news',
		type: 'get',
		success: function(data){
			show_news(data)
		}
	})
}

news_link.click(function(){
	if (news_wrap.innerHTML.length === 1){
		get_news()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		news_wrap.setAttribute("class", "")
	}
})

//append pics to carousel template
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

var show_videos = function(videos){
	shows_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "")
	videos.forEach(function(item){
		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		videos_wrap.appendChild(h3);
		videos_wrap.appendChild(p);
	});
}

//hit the server and get videos
var get_videos = function(){
	$.ajax({
		url: '/videos',
		type: 'get',
		success: function(data){
			show_videos(data)
		}
	})
}

videos_link.click(function(){
	if (videos_wrap.innerHTML.length < 1){
		get_videos()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "")
	}
})

var show_contact = function(contact){
	shows_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "")
	contact.forEach(function(item){
		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		contact_wrap.appendChild(h3);
		contact_wrap.appendChild(p);
	});
}

//hit the server and get contact
var get_contact = function(){
	$.ajax({
		url: '/contact',
		type: 'get',
		success: function(data){
			show_contact(data)
		}
	})
}

contact_link.click(function(){
	if (contact_wrap.innerHTML.length < 1){
		get_contact()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "")
	}
})

var show_press = function(press){
	shows_wrap.setAttribute("class", "hidden")
	contact_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	press_wrap.setAttribute("class", "")
	press.forEach(function(item){
		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		press_wrap.appendChild(h3);
		press_wrap.appendChild(p);
	});
}

//hit the server and get press
var get_press = function(){
	$.ajax({
		url: '/press',
		type: 'get',
		success: function(data){
			show_press(data)
		}
	})
}

press_link.click(function(){
	if (press_wrap.innerHTML.length < 1){
		get_press()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "")
	}
})

var show_shows = function(shows){
	contact_wrap.setAttribute("class", "hidden")
	shows_wrap.setAttribute("class", "hidden")
	videos_wrap.setAttribute("class", "hidden")
	news_wrap.setAttribute("class", "hidden")
	pics_wrap.setAttribute("class", "hidden")
	shows_wrap.setAttribute("class", "")
	shows.forEach(function(item){
		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		shows_wrap.appendChild(h3);
		shows_wrap.appendChild(p);
	});
}

//hit the server and get shows
var get_shows = function(){
	$.ajax({
		url: '/shows',
		type: 'get',
		success: function(data){
			show_shows(data)
		}
	})
}

shows_link.click(function(){
	if (shows_wrap.innerHTML.length < 1){
		get_shows()
	} else {
		news_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		press_wrap.setAttribute("class", "hidden")
		contact_wrap.setAttribute("class", "hidden")
		videos_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "hidden")
		pics_wrap.setAttribute("class", "hidden")
		shows_wrap.setAttribute("class", "")
	}
})

window.onload = function(){
	get_news()
};