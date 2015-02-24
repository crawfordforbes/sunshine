var butt = $("#save_pic_status")
butt.click(function(){
var pics = $('input[class="checkbox"]:checked');
debugger
$.ajax({
	url: "/admin/pics",
	data: pics,
	type: "put",
	success: function(responseText){
		console.log("success")
	}
})
// pics.forEach(function(pic){
// 	console.log(pic.checked)
// }
});

