// var bod = $("#content");
// click on link
var news_link = $("#news");
var shows_link = $("#shows");
var pics_link = $("#pics");
var press_link = $("#press");
var videos_link = $("#videos");
var contact_link = $("#contact");

//wrappers
var news_wrap = $("#news_wrapper")[0];
var pics_wrap = $("#carousel_wrapper")[0];
var videos_wrap = $("#videos_wrapper")[0];
var contact_wrap = $("#contact_wrapper")[0];
var press_wrap = $("#press_wrapper")[0];
var shows_wrap = $("#shows_wrapper")[0];
var all_wraps = [news_wrap, pics_wrap, videos_wrap, contact_wrap, press_wrap, shows_wrap]

//hide all content
var hideAll = function(){
	all_wraps.forEach(function(item){
		item.setAttribute("class", "hidden")
	})
}

//append conent to page
var addContent = function(content){
	content.forEach(function(item){

		var p = document.createElement('p');
		var h3 = document.createElement('h3');
		var date = document.createElement('p')
		h3.innerHTML = item.title;
		p.innerHTML = item.story;
		date.innerHTML = "<span style='font-size: 16px'>Posted on " + item.updated_at.split("T")[0] + "</span>";
		var wrapper = $("#" + item.section + "_wrapper")[0];
		wrapper.setAttribute("class", "")
		wrapper.appendChild(h3);
		wrapper.appendChild(p);
		if (item.section === "news") {
			wrapper.appendChild(date);}
		});
}

//retrieve data from server
var getContent = function(section){
	$.ajax({
		url: '/' + section,
		type: 'get',
		success: function(data){
			addContent(data)
		}
	})
}

//click on a link
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

pics_link.click(function(){

	if (pics_wrap.className === "hidden") {
		hideAll();
		pics_wrap.setAttribute("class", "");
		$.ajax({
			url: '/pics',
			type: 'get',
			success: function(data){
				for(var k = 0; k<data.length; k++){
					var list = document.createElement('li');
					list.setAttribute("class", "paginate");
					list.setAttribute("style", "display: inline-block; list-style: none;")
		
					list.innerHTML = '<a href="#" data-toggle="modal" data-target="#modal' + data[k].id + '"><img src="' + data[k].url + '" style="height: 250px; width: auto; margin: 3px; border: solid 1px white; border-radius: 8px;"></a><div class="modal fade" id="modal<%=pic.id %>" tabindex="-1" role="dialog" aria-labelledby=""><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><img src="' + data[k].url + '" style="height: auto; width: 100%;"></div></div></div></div>';
					var thumbs = document.getElementById("thumbs");
					thumbs.appendChild(list)
				};
				var pageParts = $(".paginate");

				// How many parts do we have?
				var numPages = $("#picscount").val();
				// How many parts do we want per page?
				var perPage = 15;
				
				// When the document loads we're on page 1
				// So to start with... hide everything else
				pageParts.slice(perPage).hide();
				// Apply simplePagination to our placeholder
				$("#page-nav").pagination({
					items: numPages,
					itemsOnPage: perPage,
					cssStyle: "dark-theme",
					onPageClick: function(pageNum) {
						var start = perPage * (pageNum - 1);
						var end = start + perPage;
						pageParts.hide()
						.slice(start, end).show();
					}
				});
			}
		})
	}
})



window.onload = function(){
	getContent(news_link[0].id)
};