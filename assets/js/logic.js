//API INFORMATION
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '211bb863eemsh3f9d5c4defa0f4dp16d6a1jsn4dbcefde1009',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
.then(function(response){
    if(response.ok){
        response.json().then(function(data){
            
            console.log(data);
            let song_1;
            let song_2;

            song_1 = data[getRandomIndex().firstIndex];
            song_2 = data[getRandomIndex().secondIndex];

            //Render the songs when the data arrives.
            renderSongCards(song_1, song_2)

            console.log(song_1);
            console.log(song_2);

            arrows.forEach(arrow => {
                arrow.addEventListener("click", (e)=> {
                    //Function to move the second song to the front of the data array.
                    data.unshift(song_2)
                    console.log(data);
					getUserAnswer(e);
                    compareSongRank();
                    checkIfCorrect();
                    if(correct === true){
                        song_1 = data[0];
                        song_2 = data[getRandomIndex().secondIndex];
                        (renderSongCards(song_1, song_2));
                        console.log("First: " + card_1.dataset.index);
                        console.log("Second: " + card_2.dataset.index);
                    }else if(correct === false){
                        //If correct is false, no longer render the cards on arrow click.
                        return
                        song_1 = data[getRandomIndex().firstIndex];
                        song_2 = data[getRandomIndex().secondIndex];
                        (renderSongCards(song_1, song_2));
                        console.log("First: " + card_1.dataset.index);
                        console.log("Second: " + card_2.dataset.index);
                    };
                        console.log(song_1);
                        console.log(song_2);

                })
            })

            
        })
    }else{
        console.log("Error: " + response.statusText)
    }
});

// Variables for the DOM elements. 
let gameContainer = document.querySelector(".fourty");
let arrows = document.querySelectorAll(".arrow");
let card_1 = document.getElementById("artist-1");
let card_2 = document.getElementById("artist-2");

// Variables for functions. 
let score = 0;
let answer;
let higher;
let correct;
let gameOver = false;

//Functions. 

//Function to get random index number for the API data array. 
function getRandomIndex(){
    let firstIndex = Math.floor(Math.random()*(200 + score));
    let secondIndex;

    //If the second index number is equal to the first, we run get another random number.
    //To avoid the same song being compared. 
    do {
        secondIndex = Math.floor(Math.random()*(200 + score));
    } while (secondIndex === firstIndex);

    return {firstIndex, secondIndex}
};

//Function to render the cards.
function renderSongCards(song1, song2){
    card_1.textContent = "";

    let coverArt_1 = document.createElement("img");
    let songName_1 = document.getElementById("song-name-1");
    let artistName_1 = document.getElementById("artist-name-1");
    let songRank = document.getElementById("song-rank");

    songName_1.textContent = song1.trackMetadata.trackName;
    artistName_1.textContent = song1.trackMetadata.artists[0].name;
    songRank.textContent = `Rank : ${song1.chartEntryData.currentRank}`;
    
    coverArt_1.style.width = "100%";
    coverArt_1.src = song1.trackMetadata.displayImageUri;
    //Setting the data-index value to the current rank of the song.
    card_1.dataset.index = song1.chartEntryData.currentRank;
    card_1.appendChild(coverArt_1);

    card_2.textContent = "";

    let coverArt_2 = document.createElement("img");
    let songName_2 = document.getElementById("song-name-2");
    let artistName_2 = document.getElementById("artist-name-2");

    songName_2.textContent = song2.trackMetadata.trackName;
    artistName_2.textContent = song2.trackMetadata.artists[0].name;

    coverArt_2.style.width = "100%";
    coverArt_2.src = song2.trackMetadata.displayImageUri;
    //Setting the data-index value to the current rank of the song.
    card_2.dataset.index = song2.chartEntryData.currentRank;
    card_2.appendChild(coverArt_2);
}


// Function to record user answer depending on if they click the up or down arrow.
function getUserAnswer(e){
    if(e.target.classList.contains("up-arrow")){
        answer = true;
        console.log("You think the second is ranked higher than the first!")
    }else if(e.target.classList.contains("down-arrow")){
        answer = false;
        console.log("You think the second is ranked lower than the first!")
    }
};

// Function to compare the current ranks of the two songs. 
function compareSongRank(){
    let card_1_rank = Number(card_1.dataset.index);
    let card_2_rank = Number(card_2.dataset.index);
    if(card_1_rank > card_2_rank){
        higher = true;
		console.log("First: " + card_1.dataset.index);
		console.log("Second: " + card_2.dataset.index);
        console.log("Higher is true.")
    }else if(card_1_rank < card_2_rank){
        higher = false;
		console.log("First: " + card_1.dataset.index);
		console.log("Second: " + card_2.dataset.index);
        console.log("Higher is false.")
    }else if(card_1_rank == card_2_rank){
        higher = true;
    }
};

//Function to check if the user is correct. If not then game over becomes true.
function checkIfCorrect(){
   if(higher === true && answer === true){
    correct = true;
    incrementScore();
    updateCardCorrect();
	console.log(correct)
    console.log("Correct!");
   }if(higher === false && answer === false){
    correct = true;
    incrementScore();
    updateCardCorrect();
	console.log(correct);
    console.log("Correct!");
   }if(higher === true && answer === false){
    correct = false;
    updateCardIncorrect();
    endGame();
	console.log(correct);
    console.log("False!");
   }if(higher === false && answer === true){
    correct = false;
    updateCardIncorrect();
    endGame();
	console.log(correct);
    console.log("False!");
   }
};

//Function to give user feedback if correct.
function updateCardCorrect (){
    card_1.style.border = "10px solid green";
    setTimeout(function(){
        card_1.style.border = "none";
    }, 500);
};
//Function to give user feedback if incorrect.
function updateCardIncorrect(){
    card_1.style.border = "10px solid red";
    setTimeout(function(){
        card_1.style.border = "none";
    }, 500);
};

//Function to add a point to the user score.
function incrementScore (){
    score ++;
    console.log(score)
    return score
};

//Function to end game.
function endGame(){
    setTimeout(function(){location.href="./assets/html/endpage.html"} , 1000);  
}

// Function to reset the game.
function resetGame(){
    score = 0;
};




