// var first = {name:'first', get}
// var os = {name:'os', android:24, ios:35, both:70};
// var screen = {name:'screen', sm:24, md:55, bg:77, lg:100};
// var design = {name:'design', stock:50, custom:150, animated:200};
// var api = {name:'api', with:300, simple:500, advanced:700};
// var aa = {name:'aa', email:150, soc:200, twoFactor:400};
// var ff = {name:'ff', dash:100, activ:150, userProf:200, textSearch:250, fileUp:300, multiSup:500};
// var dates = {name:'dates', geo:150, map:200, booking:250, calendar:300};
// var social = {name:'social', masseg:50, socShare:75, forums:150, push:200, rating:100}
// var ecom = {name:'ecom', payment:300, shopping:350, marketplace:300};
// var media = {name:'media', video:100, audio:100, photo:50};
// var admin = {name:'admin', cms:300, userAdmin:350, monitoring:400, payAdmin:450};
// var security = {name:'security', role:300, data:250, privecy:300};
// var estimate = {name:'estimate'}
// var arr = [first, os, screen, design, api, aa, ff, dates, social, ecom, media, admin, security, estimate];

// var price = 0;
// var status;

// // document.getElementById('prev').addEventListener('click', function(){
// // 	document.getElementById(pages[status]).style.display = "none";
// // 	document.getElementById(pages[status-1]).style.display = "table-cell";

// // 	status -= 1;
// // 	if (status<2) {
// // 		document.getElementById('prev').style.visibility = "hidden";
// // 	}
// // });

// document.querySelector('main').addEventListener('click', function () {
// 	var elem = event.target;
// 	var par = elem.parentNode.parentNode.id;

//  	for (var x = 0; x < arr.length; x++) {
//  		if (par==arr[x].name) {
// 			var a = Object.keys(arr[x]);

// 			for (var i = 0; i < Object.keys(arr[x]).length; i++) {
// 	 			if (elem.id==a[i]) {
// 	 				var now = document.getElementById(arr[x].name);
// 					var next = document.getElementById(arr[x+1].name);

// 					now.style.display = "none";
// 					next.style.display = "table-cell";

// 					// return status=i+1;
// 	 				break;
// 	 			};
// 			}
// 		}
// 	}
// });

