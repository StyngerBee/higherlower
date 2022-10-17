
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6b19242e27mshaaddac799972dfep1bbe51jsnba083ea5c7fd',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

// fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


	fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
		.then(function(response){
			if(response.ok){
				response.json().then(function(data){
					let song_1;
					let song_2;

					song_1 = data[getRandomIndex().firstIndex]
					song_2 = data[getRandomIndex().secondIndex]
							renderArtist_1(song_1)
							renderArtist_2(song_2);

					console.log(song_1, song_2);
					
					arrows.forEach(arrow => {
						arrow.addEventListener("click", (e)=>{
							data.unshift(song_2);
							console.log(data);
							if(score >= 0){
								song_1 = data[0];
								song_2 = data[getRandomIndex().secondIndex];
									renderArtist_1(song_1);
									renderArtist_2(song_2);
							}else if(score === 0){
								song_1 = data[getRandomIndex().firstIndex];
								song_2 = data[getRandomIndex().secondIndex];
									renderArtist_1(song_1);
									renderArtist_2(song_2);
							};
							console.log(song_1, song_2)
							getSongRank();
							determineAnswer(e);
							checkGameOver();
						})
					})
				})
			}else{
				console.log("Error: " + response.statusText)
			}
		});


let arrows = document.querySelectorAll(".arrow");

let gameOver = false;
let higher;
// Boolean. 
let answer; 
let score = 0;

let artist_1 = document.getElementById("artist-1");
let artist_2 = document.getElementById("artist-2");

let gameContainer = document.querySelector(".fourty");

function getRandomIndex (){
	let firstIndex = Math.floor(Math.random()*200 + score);
	let secondIndex;
	do {
		secondIndex = Math.floor(Math.random() * 200 + score);
	} while(secondIndex === firstIndex);

	return {firstIndex, secondIndex}
};


function renderArtist_1 (data){
	artist_1.textContent = "";

	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data.trackMetadata.displayImageUri
	artist_1.dataset.index = data.chartEntryData.currentRank
	artist_1.appendChild(coverArt);
}

function renderArtist_2 (data){
	artist_2.textContent = "";

	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data.trackMetadata.displayImageUri;
	artist_2.dataset.index = data.chartEntryData.currentRank
	artist_2.appendChild(coverArt);
}

function determineAnswer(e){
	if(e.target.classList.contains("up-arrow")){
		answer = true;
		console.log(answer)
	}else if(e.target.classList.contains("down-arrow")){
		answer = false;
		console.log(answer);
	}
};

function getSongRank () {
	if(artist_1.dataset.index < artist_2.dataset.index){
		higher = true;
		console.log(higher)
	}else if(artist_1.dataset.index > artist_2.dataset.index){
		higher = false;
		console.log(higher)
	}
};

function incrementScore (){
	score ++;
	console.log(score);
	return score
}

function checkGameOver(){
	if(higher === true && answer === true){
		incrementScore();
		console.log("Correct!")
	}else if (higher === false && answer === false){
		incrementScore();
		console.log("Correct!")
	}else if (higher === true && answer === false || higher === false && answer === true){
		console.log("Incorrect!");
		resetGame();
	}
};

function resetGame(){
	score = 0;
	console.log(score)
}

// GAME FLOW

// Click on the start button.
// Hide the homescreen. Show the game screen.
// Get two random indexes for the array.
// Use the array to choose two songs.
// Render the songs to the dom.
// Record user click.
// reveal song rank.
// Check if game over.
// Add to score.
// Get two new songs.
// Continue until game over equals true.
// If gameover equals true, hide game screen.
// Display end screen.
// Go to leaderboard or play again.

