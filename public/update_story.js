var change = $("#temp_change")
var title = $("#temp_title")
var story = $("#temp_story")
var section = $("#section_box")
var update = $("#update_butt")
var modal = $("#modal_toggle")
var title_app = $("#title_approval")
var story_app = $("#story_approval")
var del_check = $("#delete_check")
var del_button = $("#delete_button")
var id = parseInt($(".this_post_id")[0].id)
change.click(function(){
	console.log("ok");
	var new_title = $("#title_box").val();
	var new_story = $("#story_box").val();
	title[0].innerHTML = new_title;
	story[0].innerHTML = new_story;
	title_app[0].innerHTML = new_title;
	story_app[0].innerHTML = new_story;
	modal[0].setAttribute("style", "");
})

update.click(function(){
	var post_hash = {id: id, title: title_app[0].innerHTML, story: story_app[0].innerHTML, section: section[0].value};
	$.ajax({
		url: "/admin/post",
		data: post_hash,
		type: "put",
		success: function(){
			window.location.replace("http://www.sunshinenights.com/admin/posts");
		}
	})
});
del_button.click(function(){
	console.log("CLICK");
	if(del_check.is(':checked')) {
		$.ajax({
			url: '/admin/post/' + id,
			type: 'delete',
			success: function(){
				window.location.replace("http://www.sunshinenights.com/admin/posts");
			}
		});
	} else {
		alert("Check the box if you want to delete this post");
	};
});