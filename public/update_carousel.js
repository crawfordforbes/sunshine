//grab checked carousel boxes and send them to server.
var butt = $("#save_pic_status")
butt.click(function(){
	var pic_arr = []
	var pics = $('input[class="checkbox"]:checked');
	for(var i=0; i<pics.length; i++){
		pic_arr.push(parseInt(pics[i].id)) 
	};
	console.log(pic_arr)
	$.ajax({
		url: "/admin/pics",
		data: JSON.stringify(pic_arr),
		type: "put"
	})
});

