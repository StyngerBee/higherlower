//creating elements//

var answerResult = document.querySelectorAll('.result');

var resultsPage = document.getElementById('results')
var scoreEl= document.getElementById('displayScore');
var initials = document.getElementById('initials');
var submitBtn = document.getElementById('submit');

var highScoresPage = document.getElementById('high-scores');
var highScoresList = document.getElementById('all-scores');
var againBtn = document.getElementById('play-again');
var clear = document.getElementById('clear');
var initialsList = [];
var allTimeHighScores =[];
var storedScores;

// renders initials and score into a li element//
function renderHighScores() {
    resultsPage.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    highScoresList.innerHTML = '';
    for (var i = 0; i < initialsList.length; i++) {
        var newInitials = allTimeHighScores[i].initials;
        var newScores = allTimeHighScores[i].highscore;

        var li = document.createElement('li');
        li.setAttribute('class', 'scoresList')
        li.textContent = newInitials + ' - ' + newScores;
        

        highScoresList.appendChild(li);
    }
}

// gets stored initials and scores from local storage
function getStoredScores() {
    var storedInitials = JSON.parse(localStorage.getItem('initialsList'));
    var pulledstoredScores = localStorage.getItem('preIscore');

    if (storedInitials !== null) {
        initialsList = storedInitials;
        
    }
    storedScores = pulledstoredScores;
    scoreEl.innerHTML = storedScores;
}

// stores initials and score into local storage
function storeScores() {
    
    var playerInfo = { 
        "initials": initials.value,
        "highscore": storedScores
    }
   allTimeHighScores.push(playerInfo);
   
    console.log(playerInfo);
    localStorage.setItem('allTimeHighScores', JSON.stringify(allTimeHighScores));

    console.log(allTimeHighScores);
}

    getStoredScores();
    


submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

   

    // var initialsText = initials.value.trim().toUpperCase();

    // if (initialsText === "") {
    //     return;
    // }
    
    storeScores();
    getStoredScores();
    renderHighScores();
});


