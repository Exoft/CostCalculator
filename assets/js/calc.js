var userName = getEstimateForm.name;

userName.addEventListener('input', function() {
    var name = this.value.replace(/[^A-Za-z]/g, '').substring(0, 20);
    this.value = name;
});

var userEmail = getEstimateForm.mail;

userEmail.addEventListener('change', function() {
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
    xobj.onreadystatechange = function() {
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
var hourCost;
var hoursSumm = 0;
var totalPrice;
var choiseMaded;
var list;
var nodeListTotalPrice = document.getElementsByClassName("total-price");

function inner() {
    for (var i = 0; i < nodeListTotalPrice.length; i++) {
        nodeListTotalPrice[i].innerHTML = "$" + totalPrice;
    }
}

document.querySelector('main').addEventListener('click', function() {
    var buttonOnClick = event.target;
    var parentDiv = buttonOnClick.parentNode.parentNode.parentNode.parentNode.id;

    if (!parentDiv) {
        return;
    } else if (parentDiv == 'mobileOperatingSystem') {
        os = buttonOnClick.id;
        hourCost = price[os].hourcost;
        totalPrice = hourCost;
        inner();
    } else if (parentDiv == 'screens' && os) {
        screen = buttonOnClick.id;
        choiseMaded = price[os].screenNumbers[screen];
        list = Object.getOwnPropertyNames(choiseMaded);
        totalPrice = hourCost * choiseMaded.userInterfaceDesign.stock;
        inner();
    } else if (parentDiv) {
        for (i = 0; i < list.length; i++) {

            if (list[i] == parentDiv) {

                var newlist = Object.keys(choiseMaded[list[i]])

                for (j = 0; j < newlist.length; j++) {

                    var buttonList = choiseMaded[list[i]];
                    var arrbuttonList = Object.keys(buttonList);

                    if (buttonOnClick.id == arrbuttonList[j]) {
                        totalPrice = hourCost * (hoursSumm += buttonList[buttonOnClick.id]);
                        inner();
                        break;
                    }
                };
            };
        };
    }
});