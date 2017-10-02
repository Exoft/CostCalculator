var userName = getEstimateForm.name;

	userName.addEventListener('input', function () {
	var name = this.value.replace(/[^A-Za-z]/g, '').substring(0,20);
	this.value = name;
 });

var userEmail = getEstimateForm.mail;

	userEmail.addEventListener('change', function () {
		var email = this.value;
		var patt = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
			if (!patt.test(email)) {
				alert("please, enter your email correctly")
			}	
	})

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType(".pricelist.json");
    xobj.open('GET', 'my_data.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init() {
 loadJSON(function(response) {
    var priceList = JSON.parse(response);
 });
}

var os;
var screen;
var hoursSumm = 0;
var choiseMaded;
var list;

document.querySelector('button').addEventListener('click', function () {
	var buttonOnClick = event.target;
	var parentDiv = buttonOnClick.parentNode.parentNode.parentNode.parentNode.id;

	if (parentDiv == 'mobileOperatingSystem') {
		return os = buttonOnClick.id;
	} else if (parentDiv == 'screens' && os) {
		screen = buttonOnClick.id;
		choiseMaded = price[os].screenNumbers[screen];
		list = Object.getOwnPropertyNames(choiseMaded);
		return choiseMaded, list, screen;
	} else if (parentDiv) {
	for (i=0; i < list.length ; i++) {			
 		
 		if (list[i] == parentDiv) {
 			
 			var newlist = Object.keys(choiseMaded[list[i]])

			for (j=0; j< newlist.length; j++) {

					var buttonList = choiseMaded[list[i]];
					var arrbuttonList = Object.keys(buttonList);

					if (buttonOnClick.id == arrbuttonList[j]) {

						return hoursSumm += buttonList[buttonOnClick.id];
					}
				};
			};
		};
	} 
});


