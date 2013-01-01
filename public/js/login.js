$(document).ready(function(){
	$.getJSON('http://ec2-23-20-108-231.compute-1.amazonaws.com:1987/fcloud/?publickey=0', function(data) {
		  var items = [];

		  $.each(data, function(key, val) {
		    items.push('<div class="span6 list-div">'+
		               '<a href="detail.html">'+
	                   '<div class="right-first-div pull-left">'+
	                   '<img   alt="64x64"  src="img/male.png">'+
	                   '</div>'+	                
	                   '<div class="right-second-div pull-left">'+
	                   '<h5>Rajesh Kumar Jha</h5>'+
	                   '<span class="location"> New Delhi</span>'+	                
	                   '</div>'+
	                   '<div class="right-third-div pull-right">'+
	                   '<button class="btn btn-mini btn-primary" data-loading-text="loading..."  type="button">'+
	                   'Trace Me'+
	                   '</button>'+
	                   '<i class="icon-film"></i>'+                
	                   '</div>'+
	                   '</a>'+
	        		   '</div>');
		  });

		  $('#list').innerHtml();
	});
});