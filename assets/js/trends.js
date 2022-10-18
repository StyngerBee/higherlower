// Global variable init
var trendsList = [];
var yearList = [];
var monthList = [];
var dayList = [];
var dateList = [];
var apiUrl = "https://floating-headland-95050.herokuapp.com/https://serpapi.com/search?engine=google_trends&q=drake&api_key=8a50f6381a803b34d605a70176d626a9fa40d4549c90261224e755b352a481ea"

fetch (apiUrl)
    // .then that returns the response as json
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    // .then that is responsible for parsing data and calling createChart()
    .then(function (data) {
        var trendsArr = data.interest_over_time.timeline_data;

        for (var index = 0; index < trendsArr.length; index++) {
            // Year extraction
            trendsList.push(trendsArr[index].values[0].extracted_value);
            var lastYear = trendsArr[index].date.slice(trendsArr[index].date.lastIndexOf(',') + 1);
            yearList.push(lastYear.trim());

            // Variable init
            var rest = trendsArr[index].date.slice(0, trendsArr[index].date.lastIndexOf(','));
            var restList = rest.split("");
            restList.reverse();
            var chs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var nums = "0123456789";
            var untouchedMonth = true;
            var lastMonth = [];
            var untouchedDay = true;
            var lastDay = [];

            if (restList != null) {
                for (var i = 0; i < restList.length; i++) {
                    // Month extraction
                    if(chs.match(restList[i]) !== null && untouchedMonth) {
                        lastMonth.push(restList[i]);
                    } else if (chs.match(restList[i]) === null && lastMonth.length > 0 && untouchedMonth) {
                        untouchedMonth = false;
                    }

                    // Day extraction
                    if(nums.match(restList[i]) !== null && untouchedDay) {
                        lastDay.push(restList[i]);
                    } else if (nums.match(restList[i]) === null && lastDay.length > 0 && untouchedDay) {
                        untouchedDay = false;
                    }
                }
            }

            // Proper Date formatting + Saving into Array
            monthList.push(lastMonth.reverse().toString().replaceAll(',', ''));
            dayList.push(Number(lastDay.reverse().toString().replaceAll(',','')));
            var fullDate = `${monthList[index]} ${dayList[index]}, ${yearList[index]}`;
            dateList.push(dayjs(fullDate).format('MM-DD-YYYY'));
        }
        createChart()
    })
    .catch(function (error) {
        alert(error);
    });

function createChart() {
    var chartData = [];
    // Preemptive data formatting
    for (var i = 0; i < dateList.length; i++) {
        chartData.push({
            x: new Date(dateList[i]),
            y: trendsList[i]
        });
    }

    var popularityChartEl = document.getElementById("popularity");
    new Chart(popularityChartEl, {
        type: "line",
        data: {
            datasets: [{
                data: chartData,
                borderColor: "#1db954",
                backgroundColor: "#1db95466",
                fill: true
            }]
        },
        options: {
            // scaling functionality
            responsive: true,

            // Title
            plugins: {
                legend: {
                    position: 'top',
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Popularity',
                },
            },

            // X/Y-axis formatting
            scales: {
                x: {
                    type: "time",
                    time: {
                      unit: "month"
                    }
                },
                y: {
                    beginAtZero: true
                }
            },

            // Additional formatting
            elements: {
                point:{
                    radius: 0
                }
            },
            events: ['click']
        }
    });
    // Learned from https://stackoverflow.com/questions/69879271/working-with-multiple-date-axes-in-chartjs 
}
