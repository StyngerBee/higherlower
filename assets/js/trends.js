var trendsList = [];
var yearList = [];
var monthList = [];
var dayList = [];
var firstMonthList = [];
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
                var lastYear = trendsArr[index].date.slice(trendsArr[index].date.lastIndexOf(',') + 1);
                yearList.push(lastYear.trim());

                var rest = trendsArr[index].date.slice(0, trendsArr[index].date.lastIndexOf(','));
                var restList = rest.split("");
                restList.reverse();
                // console.log(rest.toLowerCase());
                var chs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var nums = "0123456789";

                var untouchedMonth = true;
                var lastMonth = [];
                var untouchedDay = true;
                var lastDay = [];
                for (var i = 0; i < restList.length; i++) {
                    if(chs.match(restList[i]) !== null && untouchedMonth) {
                        lastMonth.push(restList[i]);
                    } else if (chs.match(restList[i]) === null && lastMonth.length > 0 && untouchedMonth) {
                        untouchedMonth = false;
                    }
                    // console.log(chs.match(restList[i]));

                    if(nums.match(restList[i]) !== null && untouchedDay) {
                        lastDay.push(restList[i]);
                    } else if (nums.match(restList[i]) === null && lastDay.length > 0 && untouchedDay) {
                        untouchedDay = false;
                    }
                    // console.log(nums.match(restList[i]));
                }

                monthList.push(lastMonth.reverse().toString().replaceAll(',', ''));
                dayList.push(Number(lastDay.reverse().toString().replaceAll(',', '')));
                // console.log(restList);
            }
            // console.log(trendsList);
            // console.log(yearList);
            // console.log(monthList);
            // console.log(dayList);
            // console.log(trendsArr);

            for (var i = 0; i < dayList.length; i++) {
                if (dayList[i] <= 7) {
                    firstMonthList.push(i);
                }
            }

            // console.log("test");
            for (var i = 0; i < firstMonthList.length; i++) {
                console.log(monthList[firstMonthList[i]], dayList[firstMonthList[i]], yearList[firstMonthList[i]])
            }
        }
    })
    .catch(function (error) {
        alert(error);
    });