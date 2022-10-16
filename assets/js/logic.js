
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e06928a00msh707867a2a351098p112c16jsn62fbfdebcd93',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

function test (){
	fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
		.then(function(response){
			if(response.ok){
				response.json().then(function(data){
					// renderCard(data[0].trackMetadata.displayImageUri,
					// 		   data[0].trackMetadata.trackName,
					// 		   data[0].chartEntryData.currentRank);
					let song_1;
					let song_2;
					
					arrows.forEach(arrow => {
						arrow.addEventListener("click", ()=>{
							getFirstIndex();
							getSecondIndex();
							song_1 = data[getFirstIndex()]
							song_2 = data[getSecondIndex()]
							renderArtist_1(song_1.trackMetadata.displayImageUri);
							renderArtist_2(song_2.trackMetadata.displayImageUri);
						})
					})
				})
			}else{
				console.log("Error: " + response.statusText)
			}
		})
};

test();



// function renderCard(cover, name, rank){
// 	let card = document.querySelector(".card-1");
// 	let cardImage = document.createElement("img");
// 	let cardRank = document.createElement("p");

// 	cardImage.src = cover;
// 	card.textContent = name;
// 	cardRank.textContent = rank;
// 	card.append(cardImage, cardRank);
// };
// renderCard();
let arrows = document.querySelectorAll(".arrow");

let gameOver = false;
let higher = false;
// Boolean. 
let answer; 

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

function renderArtist_1 (data){
	artist_1.textContent = "";
	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_1.appendChild(coverArt);
}

function renderArtist_2 (data){
	artist_2.textContent = "";
	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_2.appendChild(coverArt);
}


function checkGameOver(){
	if(gameOver === true){
		console.log("Game over!")
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

