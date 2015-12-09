function parse() {
  var tmp = [];
  var year, season;

  var items = location.search.substr(1).split("&");//first we remove the part after "?" and split this part with &

  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");

    //two parameters allowed : year, season
    if (tmp[0].search("year") != -1) {
      year = tmp[1];
    }
    if (tmp[0].search("season") != -1) {
      season = tmp[1];
    }
  }
  return new Array(season, year);
}

function readListJsonFile(link) {
	var req = new XMLHttpRequest();
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var tmp = parse();
				var objJson = JSON.parse(req.responseText);

				var yearObj = getObjects(objJson, "year", tmp[1]);
				if(yearObj.length != 0 && getObjects(yearObj, "season", tmp[0]).length === 1) {
					var seasonObj = getObjects(yearObj, "season", tmp[0]);
					document.title = yearObj[0].year + " " + getValues(seasonObj, "title");
					
					readJsonFile(yearObj[0].url + getValues(seasonObj, "url"), SEASON);
				}
				else {
					document.title = "2015 automne";
					readJsonFile("2015/automne_TV.json", SEASON);
				}
				writeMessageTable('titre', document.title);
			}
			else {

			}
		}
	};
	req.send(null);
}
