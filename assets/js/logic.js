const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e06928a00msh707867a2a351098p112c16jsn62fbfdebcd93',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

fetch('https://spotify81.p.rapidapi.com/top_20_by_monthly_listeners', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));