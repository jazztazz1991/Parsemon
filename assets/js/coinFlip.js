const settings = {
	async: true,
	crossDomain: true,
	url: 'https://coin-flip1.p.rapidapi.com/headstails',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '501efeabe9mshd81d164f2107583p17aec3jsn0b63b3047a05',
		'X-RapidAPI-Host': 'coin-flip1.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});