
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
					let song_1 = data[getFirstIndex(data)]
					let song_2 = data[getSecondIndex(data)]
					console.log(song_1);
					console.log(song_2);
					renderArtist_1(song_1.trackMetadata.displayImageUri)
					renderArtist_2(song_2.trackMetadata.displayImageUri)
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

let gameOver = false;
let higher = false;
// Boolean. 
let answer; 

let artist_1 = document.getElementById("artist-1");
let artist_2 = document.getElementById("artist-2");

let gameContainer = document.querySelector(".fourty");

function getFirstIndex (data){
	let firstIndex = Math.floor(Math.random()*data.length);
	console.log(firstIndex)
	return firstIndex
};

function getSecondIndex (data){
	let secondIndex = Math.floor(Math.random()*data.length);
	if(secondIndex === getFirstIndex){
		secondIndex = getFirstIndex - 1;
		console.log(secondIndex)
	}else{
		return secondIndex
	}
};

function renderArtist_1 (data){
	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_1.appendChild(coverArt);
}

function renderArtist_2 (data){
	let coverArt = document.createElement("img");
	coverArt.style.width = "100%";
	coverArt.src = data;
	artist_2.appendChild(coverArt);
}

function determineAnswer (){
	gameContainer.addEventListener("click", function(e){
		if(e.target.className === "up-arrow"){
			console.log("Higher");
			answer = true;
		}else if(e.target.className === "down-arrow"){
			console.log("Lower");
			answer = false;
		}
	})
};

determineAnswer();

