
var price = 0;

var os = {android:24, ios:35, both:70, page:1}

var screen = {sm:24, md:55, bg:77, lg:100, page:2}

var pages = ['first', 'os', 'screen', 'design', 'api', 'aa', 'ff', 'dates', 'social', 'ecom', 'media', 'admin', 'security', 'estimate'];


var status;

function nextStep(i) {

	var now = document.getElementById(pages[i]);
	var next = document.getElementById(pages[i+1]);

	now.style.display = "none";
	next.style.display = "table-cell";

	return status=i+1;
};

function changePrice(n) {
    price += n;
	document.getElementById('price').innerHTML = "$" + price;
};

document.getElementById('prev').addEventListener('click', function(){
	document.getElementById(pages[status]).style.display = "none";
	document.getElementById(pages[status-1]).style.display = "table-cell";

	status -= 1;
	if (status<2) {
		document.getElementById('prev').style.visibility = "hidden";
	}
});


document.getElementById('get').addEventListener('click', function() {
	nextStep(0)
	changePrice(0);
	document.getElementById('cost').style.visibility = "visible";
});


document.querySelector('#os').addEventListener('click', function () {
	var elem = event.target.id;
	var a = Object.keys(os);
	for (var i = 0; i < Object.keys(os).length; i++) {
	 	if (elem==a[i]) {
	 		nextStep(os.page);

	 	};
}
});

document.querySelector('#screen').addEventListener('click', function () {
	var elem = event.target.id;
	var a = Object.keys(screen);
	for (var i = 0; i < Object.keys(screen).length; i++) {
	 	if (elem==a[i]) {
	 		nextStep(screen.page);
	 	};
}
});

