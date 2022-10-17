
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e06928a00msh707867a2a351098p112c16jsn62fbfdebcd93',
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
					// renderCard(data[0].trackMetadata.displayImageUri,
					// 		   data[0].trackMetadata.trackName,
					// 		   data[0].chartEntryData.currentRank);
					let song_1;
					let song_2;

					song_1 = data[getFirstIndex()]
					song_2 = data[getSecondIndex()]
							renderArtist_1(song_1.trackMetadata.displayImageUri, 
											song_1.chartEntryData.currentRank);
							renderArtist_2(song_2.trackMetadata.displayImageUri,
											song_2.chartEntryData.currentRank);
					
					arrows.forEach(arrow => {
						arrow.addEventListener("click", (e)=>{
							song_1 = data[getFirstIndex()]
							song_2 = data[getSecondIndex()]
							renderArtist_1(song_1.trackMetadata.displayImageUri, 
											song_1.chartEntryData.currentRank);
							renderArtist_2(song_2.trackMetadata.displayImageUri,
											song_2.chartEntryData.currentRank);
							determineAnswer(e);
							getSongRank();
							checkGameOver();
						})
					})
				})
			}else{
				console.log("Error: " + response.statusText)
			}
		})


let arrows = document.querySelectorAll(".arrow");

let gameOver = false;
let higher;
// Boolean. 
let answer; 
let score = 0;

let artist_1 = document.getElementById("artist-1");
let artist_2 = document.getElementById("artist-2");

let gameContainer = document.querySelector(".fourty");

function getFirstIndex (){
	let firstIndex = Math.floor(Math.random()*200);
	return firstIndex
};


function getSecondIndex (){
	let secondIndex = Math.floor(Math.random()*200);
	return secondIndex
};


function renderArtist_1 (data, rank ){
	artist_1.textContent = "";

	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_1.dataset.index = rank
	artist_1.appendChild(coverArt);
}

function renderArtist_2 (data, rank){
	artist_2.textContent = "";

	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_2.dataset.index = rank
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
	if(higher === answer){
		incrementScore();
		console.log("Correct!")
	}else if(!higher === answer){
		gameOver = true;
		// INPUT END GAME FUNCTION HERE.
		console.log("Incorrect! Game over!")
	}
};

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

