//API INFORMATION
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6b19242e27mshaaddac799972dfep1bbe51jsnba083ea5c7fd',
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
            renderArtist_1(song_1);
            renderArtist_2(song_2);

            console.log(song_1);
            console.log(song_2);

            arrows.forEach(arrow => {
                arrow.addEventListener("click", (e)=> {
                    //Function to move the second song to the front of the data array.
                    data.unshift(song_2);
                    getUserAnswer(e);
                    getSongRank();
                    if(higher === answer){
                        song_1 = data[0];
                        song_2 = data[getRandomIndex().secondIndex];
                        renderArtist_1(song_1);
                        renderArtist_2(song_2);
                    }else if(higher !== answer){
                        song_1 = data[getRandomIndex().firstIndex];
                        song_2 = data[getRandomIndex().secondIndex];
                        renderArtist_1(song_1);
                        renderArtist_2(song_2);
                    };
                        checkGameOver();
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
let artist_1 = document.getElementById("artist-1");
let artist_2 = document.getElementById("artist-2");

// Variables for functions. 
let score = 0;
let answer;
let higher;
let gameOver = false;

//Functions. 

//Function to get random index number for the API data array. 
function getRandomIndex(){
    let firstIndex = Math.floor(Math.random()*200 + score);
    let secondIndex;

    //If the second index number is equal to the first, we run get another random number.
    //To avoid the same song being compared. 
    do {
        secondIndex = Math.floor(Math.random()*200 + score);
    } while (secondIndex === firstIndex);

    return {firstIndex, secondIndex}
};

// Function to render the information for the first artist/song.
function renderArtist_1(data){
    //Clear the image container
    artist_1.textContent = "";

    let coverArt = document.createElement("img");
    coverArt.style.width = "100%";
    coverArt.src = data.trackMetadata.displayImageUri;
    //Setting the data-index value to the current rank of the song.
    artist_1.dataset.index = data.chartEntryData.currentRank;
    artist_1.appendChild(coverArt);

};

// Function to render the information for the second artist/song.
function renderArtist_2 (data){

    artist_2.textContent = "";

    let coverArt = document.createElement("img");
    coverArt.style.width = "100%";
    coverArt.src = data.trackMetadata.displayImageUri;
    //Setting the data-index value to the current rank of the song.
    artist_2.dataset.index = data.chartEntryData.currentRank;
    artist_2.appendChild(coverArt);

};

// Function to record user answer depending on if they click the up or down arrow.
function getUserAnswer(e){
    if(e.target.classList.contains("up-arrow")){
        answer = true;
    }else if(e.target.classList.contains("down-arrow")){
        answer = false;
    }
};

// Function to compare the current ranks of the two songs. 
function getSongRank(){
    if(artist_1.dataset.index < artist_2.dataset.index){
        higher = true;
    }else if(artist_1.dataset.index > artist_2.dataset.index){
        higher = false;
    }
};

//Function to check if the user is correct. If not then game over becomes true.
function checkGameOver(){
    if(higher === answer){
        incrementScore();
        console.log(score);
        console.log("Correct!")
    }else if(higher !== answer || answer !== higher){
        gameOver = true;
        //With game over being true we would eventually call an end game function here. 
        console.log("Incorrect!")
    }
};

//Function to add a point to the user score.
function incrementScore (){
    score ++;
    return score
};

// Function to reset the game.
function resetGame(){
    score = 0;
};


