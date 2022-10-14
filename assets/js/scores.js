function printHighscores() {
    // either get scores from local storage or set to empty array
    var scores = JSON.parse(localStorage.getItem("savedScores"));
    // sort highscores by score property in descending order
    scores.sort( function ( a, b ) { return b.score - a.score; } );
    // create li tag for each high score
    for(var i=0;i<scores.length;i++) {
        //create new button for each choice 
        var li = document.createElement("li");
        li.textContent = scores[i].init + " - " + scores[i].score;
        //display on the page
        document.getElementById("highscores").appendChild(li);
    }
  }
  
  /* function for clearing all highscores */
  function clearHighscores() {
    // removes an item from local storage
    localStorage.removeItem("savedScores");
    // reloads the page
    window.location.reload();
  }
  
  /* event to run the clear highscores function after being clicked */
  document.querySelector("#clear").addEventListener("click", clearHighscores);
  // runs the  function after the page loads
  printHighscores();