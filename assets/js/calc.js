var operationSystem, pageName, screenButton, totalPrice, pagesNameList, toogle = 0;
var answers = {
    'mobileOperatingSystem': 0,
    'screens': 1,
};

var nodeListTotalPrice = document.getElementsByClassName("total-price");

function inner() {
    var summ = 0;
    var choiseMaded;
    for (var j = 2; j < Object.keys(answers).length; j++) {
        choiseMaded = price[operationSystem].screenNumbers[screenButton];
        var answersblock = choiseMaded[Object.keys(answers)[j]];
        var choise = answersblock[Object.keys(answers).map(function(e) { return answers[e] })[j]];
        if (choise) { summ += choise; }
    };
    if (answers['mobileOperatingSystem'] > 2) {
        totalPrice = answers['mobileOperatingSystem'] * (answers['screens'] + summ);
    } else {
        totalPrice = 0;
    }
    for (var i = 0; i < nodeListTotalPrice.length; i++) {
        nodeListTotalPrice[i].innerHTML = "$" + totalPrice;
    }
};

function removeActiveButton(buttonOnClick) {
    buttonOnClick.classList.remove('active-button');
    var linkStop = buttonOnClick.parentNode;
    switch (pageName) {
        case 'mobileOperatingSystem':
            linkID = 'screens'
            break;
        case 'screens':
            linkID = 'userInterfaceDesign'
            break;
        default:
            linkID = pagesNameList[i + 1];
            break;
    };
    var link = '#' + linkID;
    linkStop.setAttribute('href', link);
    answers[pageName] = 0;
};

function oneButtonActive(buttonOnClick) {
    var siblingButtons = buttonOnClick.parentNode.parentNode.childNodes;
    var linkRestart;
    var linkStop = buttonOnClick.parentNode;

    for (x = 0; x < siblingButtons.length; x++) {
        if (siblingButtons[x].classList && siblingButtons[x].childNodes[1].classList.contains('active-button')) {
            siblingButtons[x].childNodes[1].classList.remove('active-button');
            var linkRestart = siblingButtons[x];
            var linkID;
            switch (pageName) {
                case 'mobileOperatingSystem':
                    linkID = 'screens'
                    break;
                case 'screens':
                    linkID = 'userInterfaceDesign'
                    break;
                default:
                    linkID = pagesNameList[i + 1];
                    break;
            };

            var link = '#' + linkID;
            linkRestart.setAttribute('href', link);
            answers[pageName] = 0;
        }
    };
    buttonOnClick.classList.add('active-button');
    linkStop.setAttribute('href', '#');
};

document.querySelector('main').addEventListener('click', function() {
    var buttonOnClick = event.target;
    pageName = buttonOnClick.parentNode.parentNode.parentNode.parentNode.id;
    var linkStop = buttonOnClick.parentNode;

    if (buttonOnClick.classList.contains('start-button')) {
        smoothscroll(lastevent);
        
    } else if (buttonOnClick.classList.contains('previous-button') || buttonOnClick.parentNode.classList.contains('previous-button')) {
        smoothscroll(lastevent);
    } else if (buttonOnClick.tagName == "INPUT") {
        return;
    }


    switch (pageName) {
        case 'mobileOperatingSystem':
            operationSystem = buttonOnClick.id;
            if (buttonOnClick.classList.contains('active-button')) {
                toogle = 0;
                notScrolling(lastevent);
                removeActiveButton(buttonOnClick);
                inner();
            } else {
                if (answers.screens>1) {
                    toogle = 1;
                } else {
                    toogle = 2;}
                smoothscroll(lastevent);
                oneButtonActive(buttonOnClick);
                answers[pageName] = price[operationSystem].hourcost;
                inner();
            }
            break;
        case 'screens':
            screenButton = buttonOnClick.id;
            choisenScreen = price[operationSystem].screenNumbers[screenButton];
            pagesNameList = Object.getOwnPropertyNames(choisenScreen);
            if (buttonOnClick.classList.contains('active-button')) {
                toogle = 2;
                notScrolling(lastevent);
                removeActiveButton(buttonOnClick);
                inner();
            } else {
                if (answers.mobileOperatingSystem>1) {
                    toogle = 1;
                } else {
                    toogle = 0;}
                smoothscroll(lastevent);
                oneButtonActive(buttonOnClick);
                answers[pageName] = choisenScreen.userInterfaceDesign.stock;
                inner();
            }
            break;
        default:
            if (pagesNameList) {
                for (i = 0; i < pagesNameList.length; i++) {
                    if (pagesNameList[i] == pageName) {
                        var pages = Object.keys(choisenScreen[pagesNameList[i]])
                        for (j = 0; j < pages.length; j++) {
                            var buttonList = choisenScreen[pagesNameList[i]];
                            var buttons = Object.keys(buttonList);
                            if (buttonOnClick.id == buttons[j]) {
                                if (buttonOnClick.classList.contains('active-button')) {
                                    notScrolling(lastevent);
                                    removeActiveButton(buttonOnClick);
                                    inner();
                                    break;
                                } else {
                                    smoothscroll(lastevent);
                                    oneButtonActive(buttonOnClick);
                                    answers[pageName] = buttonOnClick.id;
                                    inner();
                                    break;
                                };
                            };
                        };
                    };
                };
            } else {
                smoothscroll(lastevent);
            }
    };
});



var userName = getEstimateForm.name;

userName.addEventListener('input', function() {
    var name = this.value.replace(/[^A-Za-z ]/g, '').substring(0, 20);
    this.value = name;
});

var userEmail = getEstimateForm.mail;
var wrong = getEstimateForm.wrongEmail;

userEmail.addEventListener('change', function() {
    var email = this.value;
    var patt = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!patt.test(email)) {
        userEmail.classList.add('error');
        wrong.classList.add('show-error');
    } else {
        userEmail.classList.remove('error');
        wrong.classList.remove('show-error');
    }
})

inner();