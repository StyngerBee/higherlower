var trendsList = [];
var apiUrl = "https://floating-headland-95050.herokuapp.com/https://serpapi.com/search?engine=google_trends&q=drake&api_key=8a50f6381a803b34d605a70176d626a9fa40d4549c90261224e755b352a481ea"

fetch (apiUrl)
    // .then that returns the response as json
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    // .then that calls renderItems(city, data)
    .then(function (data) {
        if (data.length !== 0) {
            var trendsArr = data.interest_over_time.timeline_data;
            for (var index = 0; index < trendsArr.length; index++) {
                trendsList.push(trendsArr[index].values[0].extracted_value);
            }
            console.log("instant");
            console.log(trendsList);
        }
    })
    .catch(function (error) {
        alert(error);
    });

setTimeout(function() {
    console.log("delayed");
    console.log(trendsList[0]);
}, 1000)