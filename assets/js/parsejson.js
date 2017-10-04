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