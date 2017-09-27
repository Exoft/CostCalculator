var pages = ['first', 'os', 'screen', 'design', 'api', 'aa', 'ff', 'dates', 'social', 'ecom', 'media', 'admin', 'security', 'estimate'];
var price = 0;

var status

function nextStep(i) {

	var now = document.getElementById(pages[i]);
	var next = document.getElementById(pages[i+1]);

	now.style.display = "none";
	next.style.display = "table-cell";

	return status = i+1;
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

document.getElementById('android').addEventListener('click',function() {
	nextStep(1);
	changePrice(25);
	document.getElementById('prev').style.visibility = "visible";
});

document.getElementById('ios').addEventListener('click',function() {
	nextStep(1);
	changePrice(35);
	document.getElementById('prev').style.visibility = "visible";
});

document.getElementById('and_ios').addEventListener('click',function() {
	nextStep(1);
	changePrice(70);
	document.getElementById('prev').style.visibility = "visible";
});
