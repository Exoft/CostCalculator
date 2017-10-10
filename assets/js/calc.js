var operationSystem, pageName, screenButton, totalPrice, pagesNameList, toogle = 0; finalListForMail="";
var answers = {
    'mobileOperatingSystem': 0,
    'screens': 1,
};

var nodeListTotalPrice = document.getElementsByClassName("total-price");

function calculateTotalPrice() {
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
    buttonOnClick.setAttribute('href', link);
    answers[pageName] = 0;
};

function oneButtonActive(buttonOnClick) {
    var siblingButtons = buttonOnClick.parentNode.childNodes;
    var linkRestart;

    for (x = 0; x < siblingButtons.length; x++) {
        if (siblingButtons[x].classList && siblingButtons[x].classList.contains('active-button')) {
            siblingButtons[x].classList.remove('active-button');
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
    buttonOnClick.setAttribute('href', '#');
};

document.querySelector('main').addEventListener('click', function() {
    var buttonOnClick = event.target;
    pageName = buttonOnClick.parentNode.parentNode.parentNode.id;

    if (buttonOnClick.classList.contains('start-button')) {
        smoothscroll(eventClick);
        return;
    } else if (buttonOnClick.classList.contains('previous-button') || buttonOnClick.parentNode.classList.contains('previous-button')) {
        smoothscroll(eventClick);
        return;
    } else if (buttonOnClick.tagName == "INPUT" || buttonOnClick.tagName == "DIV" || buttonOnClick.tagName == "FORM") {
        return;
    }


    switch (pageName) {
        case 'mobileOperatingSystem':
            operationSystem = buttonOnClick.id;
            if (buttonOnClick.classList.contains('active-button')) {
                toogle = 0;
                notScrolling(eventClick);
                removeActiveButton(buttonOnClick);
                calculateTotalPrice();
            } else {
                if (answers.screens > 1) {
                    toogle = 1;
                } else {
                    toogle = 2;
                }
                smoothscroll(eventClick);
                oneButtonActive(buttonOnClick);
                answers[pageName] = price[operationSystem].hourcost;
                calculateTotalPrice();
            }
            break;
        case 'screens':
            if (!operationSystem) {
                toogle = 0;
                smoothscroll(eventClick);
                return;
            }
            screenButton = buttonOnClick.id;
            choisenScreen = price[operationSystem].screenNumbers[screenButton];
            pagesNameList = Object.getOwnPropertyNames(choisenScreen);
            if (buttonOnClick.classList.contains('active-button')) {
                toogle = 2;
                notScrolling(eventClick);
                removeActiveButton(buttonOnClick);
                calculateTotalPrice();
            } else {
                if (answers.mobileOperatingSystem > 1) {
                    toogle = 1;
                } else {
                    toogle = 0;
                }
                smoothscroll(eventClick);
                oneButtonActive(buttonOnClick);
                answers[pageName] = choisenScreen.userInterfaceDesign.stock;
                calculateTotalPrice();
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
                                    notScrolling(eventClick);
                                    removeActiveButton(buttonOnClick);
                                    calculateTotalPrice();
                                    break;
                                } else {
                                    smoothscroll(eventClick);
                                    oneButtonActive(buttonOnClick);
                                    answers[pageName] = buttonOnClick.id;
                                    calculateTotalPrice();
                                    break;
                                };
                            };
                        };
                    };
                };
            } else if (!operationSystem) {
                toogle = 0;
                smoothscroll(eventClick);
                return;
            } else if (!screenButton) {
                toogle = 2;
                smoothscroll(eventClick);
                return;
            }
    };
});

function createTableForEmail () {
    finalListForMail+="<tr><td>Mobile Operating System</td><td>"+operationSystem+"</td></tr><tr><td>Number Of Screens</td><td>"+screenButton+"</td></tr>"
    for (var i = 2; i < Object.keys(answers).length; i++) {      
        var serviseName = Object.keys(answers)[i];
        var serviseValue = Object.keys(answers).map(function(e) { return answers[e] })[i]; 
        finalListForMail += "<tr><td>"+serviseName+"</td><td>"+serviseValue+"</td></tr>";
    }
};


var userName = getEstimateForm.name;
var wrongName = getEstimateForm.wrongName;

userName.addEventListener('input', function() {
    var name = this.value.replace(/[^A-Za-z ]/g, '').substring(0, 20);
    this.value = name;
    if (name) {
        userName.classList.remove('error-border');
        wrongName.classList.remove('error-message')
    }
});

var userEmail = getEstimateForm.mail;
var wrongEmail = getEstimateForm.wrongEmail;

userEmail.addEventListener('change', function() {
    var email = this.value;
    var patt = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!patt.test(email)) {
        userEmail.classList.add('error-border');
        wrongEmail.classList.add('error-message');
    } else {
        userEmail.classList.remove('error-border');
        wrongEmail.classList.remove('error-message');
    }
});

document.getElementById('getEstimateButton').addEventListener('click', function () {
    if (!userName.value) {
        userName.classList.add('error-border');
        wrongName.classList.add('error-message');
    } else if (!userEmail.value) {
        userEmail.classList.add('error-border');
        wrongEmail.classList.add('error-message');
    } else {
        createTableForEmail ()
        var addTableTag = "<table><tr><th>Servises</th><th>Value</th></tr>" + finalListForMail + "</table>"+"Tota Price: $"+totalPrice; 
        emailjs.send("gmail","my_form",{
            name: userName.value, 
            email: userEmail.value,
            answer: addTableTag, 
        });

        document.getElementsByTagName('main')[0].classList.add('hide-block');
        document.getElementsByTagName('footer')[0].classList.remove('hide-block');
    }
});

calculateTotalPrice();
