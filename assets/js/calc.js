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

var os, screen, screenchois = 0,
    hourCost = 0,
    hoursSumm = 1,
    totalPrice, choiseMaded, list, keys = {};
var nodeListTotalPrice = document.getElementsByClassName("total-price");

function inner() {
    var summ = 1;

    for (var j = 0; j < Object.keys(keys).length; j++) {
        choiseMaded = price[os].screenNumbers[screen];
        var block = choiseMaded[Object.keys(keys)[j]];
        var choise = block[Object.values(keys)[j]];
        if (choise) { summ += choise; }
    };

    totalPrice = hourCost * (screenchois + summ);



    for (var i = 0; i < nodeListTotalPrice.length; i++) {
        nodeListTotalPrice[i].innerHTML = "$" + totalPrice;
    }
}

document.querySelector('main').addEventListener('click', function() {
    var buttonOnClick = event.target;
    var parentDiv = buttonOnClick.parentNode.parentNode.parentNode.parentNode.id;
    var linkStop = buttonOnClick.parentNode;
    if (!parentDiv) {
        return;
    } else if (parentDiv == 'mobileOperatingSystem') {
        os = buttonOnClick.id;
        if (buttonOnClick.classList.contains('active-button')) {
            buttonOnClick.classList.remove('active-button');
            linkStop.setAttribute('href', '#screens');
            hourCost = 0;
            inner();
        } else {
            buttonOnClick.classList.add('active-button');
            hourCost = price[os].hourcost;
            linkStop.setAttribute('href', '/');
            inner();
        }
    } else if (parentDiv == 'screens' && os) {
        screen = buttonOnClick.id;
        choisenScreen = price[os].screenNumbers[screen];
        list = Object.getOwnPropertyNames(choisenScreen);
        if (buttonOnClick.classList.contains('active-button')) {
            buttonOnClick.classList.remove('active-button');
            linkStop.setAttribute('href', '#screens');
            screenchois = 0;
            inner();
        } else {
            buttonOnClick.classList.add('active-button');
            screenchois = choisenScreen.userInterfaceDesign.stock;
            linkStop.setAttribute('href', '/');
            inner();
        }
    } else if (parentDiv) {
        for (i = 0; i < list.length; i++) {
            if (list[i] == parentDiv) {
                var newlist = Object.keys(choisenScreen[list[i]])
                for (j = 0; j < newlist.length; j++) {
                    var buttonList = choisenScreen[list[i]];
                    var arrbuttonList = Object.keys(buttonList);
                    if (buttonOnClick.id == arrbuttonList[j]) {
                        if (buttonOnClick.classList.contains('active-button')) {
                            buttonOnClick.classList.remove('active-button');
                            var linkID = list[i + 1];
                            var link = '#' + linkID;
                            linkStop.setAttribute('href', link);
                            keys[parentDiv] = 0;
                            hoursSumm -= buttonList[buttonOnClick.id];
                            inner();
                            break;
                        } else {
                            buttonOnClick.classList.add('active-button');
                            linkStop.setAttribute('href', '/');
                            keys[parentDiv] = buttonOnClick.id;
                            hoursSumm += buttonList[buttonOnClick.id];
                            inner();
                            break;
                        };

                    };
                };
            };
        };
    };
});

inner();