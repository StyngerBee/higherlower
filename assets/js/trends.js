var trendsList = [];
var yearList = [];
var monthList = [];
var dayList = [];
var firstMonthList = [];
var dateList = [];
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
        var trendsArr = data.interest_over_time.timeline_data;
        alert("before");
        console.log(2, trendsArr.length);
        for (var index = 0; index < 1; index++) { // trendsArr.length
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
            console.log(3, restList.length);
            if (restList != null) {
                for (var i = 0; i < restList.length; i++) {
                    console.log(4, lastMonth.length);
                    if(chs.match(restList[i]) !== null && untouchedMonth) {
                        lastMonth.push(restList[i]);
                    } else if (chs.match(restList[i]) === null && lastMonth.length > 0 && untouchedMonth) {
                        untouchedMonth = false;
                    }
                    // console.log(chs.match(restList[i]));

                    console.log(5, lastDay.length);
                    if(nums.match(restList[i]) !== null && untouchedDay) {
                        lastDay.push(restList[i]);
                    } else if (nums.match(restList[i]) === null && lastDay.length > 0 && untouchedDay) {
                        untouchedDay = false;
                    }
                    // console.log(nums.match(restList[i]));
                }
            }
            monthList.push(lastMonth.reverse().toString().replaceAll(',', ''));
            dayList.push(Number(lastDay.reverse().toString().replaceAll(',','')));
            // console.log(restList);
            var fullDate = `${monthList[index]} ${dayList[index]}, ${yearList[index]}`;
            dateList.push(dayjs(fullDate).format('YYYY-MM-DD'));
        }
        // console.log(trendsList);
        // console.log(yearList);
        // console.log(monthList);
        // console.log(dayList);
        // console.log(trendsArr);
        // console.log(dateList);
        console.log(6, dayList.length);
        for (var i = 0; i < dayList.length; i++) {
            if (dayList[i] <= 7) {
                firstMonthList.push(i);
            }
        }
        console.log(7, firstMonthList.length);
        // console.log("test");
        for (var i = 0; i < firstMonthList.length; i++) {
            console.log(monthList[firstMonthList[i]], dayList[firstMonthList[i]], yearList[firstMonthList[i]])
        }
        createChart()
    })
    .catch(function (error) {
        alert(error);
    });

function createChart() {
    console.log(dateList);
    // var xValues = dateList.slice(0,5);
    // var yValues = trendsList.slice(0,5);

    var chartData = [];
    alert(dateList.length);
    for (var i = 0; i < dateList.length; i++) {
        chartData.push({x: dateList[i], y: trendsList[i]});
    }
    // chartData = JSON.stringify(chartData);
    // console.log(chartData);

    alert("after");
    var popularityChartEl = document.getElementById("popularity");
    var testChart = new Chart(popularityChartEl, {
        type: "line",
        data: {
            labels: 'First dataset',
            datasets: {
                data: chartData
            }
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    console.log(testChart.data.datasets);
    
    /*
    // setup block
    const data = {
        labels: xValues,
        datasets: [{
            axis: 'y',
            label: 'Timeline',
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.1)",
            data: [{
                x: '2021-11-06 23:39:30',
                y: 50
            }, {
                x: '2021-11-07 01:00:28',
                y: 60
            }, {
                x: '2021-11-07 09:00:28',
                y: 20
            }]
        }]
    }
    
    // config block
    const config = {
        type: "line",
        data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            }
        }
    }
    
    // render / init block
    const myChart = new Chart (
        document.getElementById('myChart'),
        config
    );
    */
}
