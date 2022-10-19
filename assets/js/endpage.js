//creating elements//
var viewHighScores = document.getElementById('scores');
var answerResult = document.querySelectorAll('.result');

var resultsPage = document.getElementById('results')
var score = document.getElementById('score');
var initials = document.getElementById('initials');
var submitBtn = document.getElementById('submit');

var highScoresPage = document.getElementById('high-scores');
var highScoresList = document.getElementById('all-scores');
var againBtn = document.getElementById('play-again');
var clear = document.getElementById('clear');

// renders initials and score into a li element//
function renderHighScores() {
    resultsPage.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    highScoresList.innerHTML = '';
    for (var i = 0; i < initialsList.length; i++) {
        var newInitials = initialsList[i];
        var newScores = scores[i];

        var li = document.createElement('li');
        li.setAttribute('class', 'scoresList')
        li.textContent = newInitials + ' - ' + newScores;
        

        highScoresList.appendChild(li);
    }
}

// gets stored initials and scores from local storage
function getStoredScores() {
    var storedInitials = JSON.parse(localStorage.getItem('initialsList'));
    var storedScores = JSON.parse(localStorage.getItem('scores'));

    if (storedInitials !== null) {
        initialsList = storedInitials;
        scores = storedScores;
    }
}

// stores initials and score into local storage
function storeScores() {
    localStorage.setItem('initialsList', JSON.stringify(initialsList));

    localStorage.setItem('scores', JSON.stringify(scores));

    
}

viewHighScores.addEventListener('click', function() {
    startPage.setAttribute('data-state', 'hidden');
    timer.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    getStoredScores();
    renderHighScores();
})

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    timer.setAttribute('data-state', 'hidden');

    var initialsText = initials.value.trim().toUpperCase();

    if (initialsText === "") {
        return;
    }

    initialsList.push(initialsText);
    initials.value = "";
    scores.push(score.textContent);
    storeScores();
    getStoredScores();
    renderHighScores();
});


