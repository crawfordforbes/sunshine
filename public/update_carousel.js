var butt = $("#save_pic_status")
butt.click(function(){
	var pic_arr = []
	var pics = $('input[class="checkbox"]:checked');
	// console.log(pics[0].id)
	// $.each(pics, function(key, value){
	// 	pic_arr.push(value);
	// });
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

