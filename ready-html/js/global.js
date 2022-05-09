
const kzData = fetch('https://corona.lmao.ninja/v2/countries/Kazakhstan').then(function (response) {
	return response.json();
}).then(function (data) {
	document.getElementById('kz_cases').innerHTML=numberWithCommas(data.cases)
	document.getElementById('kz_deaths').innerHTML=numberWithCommas(data.deaths)
	document.getElementById('kz_recovered').innerHTML=numberWithCommas(data.recovered)
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

fetch('https://corona.lmao.ninja/v2/countries').then(function(response) {
	return response.json();
}).then(function (data) {
	const select = document.getElementById('select')
	console.log()
	for (let i=0; i < data.length; i++) {
		if (data[i].country !== 'Kazakhstan') {
			console.log(data[i].country)
			var option = document.createElement('option')
			option.value = data[i].country
			option.text = data[i].country
			if (data[i].country === 'USA') {
				option.selected = 'selected'
				fetch('https://corona.lmao.ninja/v2/countries/USA').then(function (response) {
					return response.json();
				}).then(function (data) {
					document.getElementById('cases').innerHTML=numberWithCommas(data.cases)
					document.getElementById('deaths').innerHTML=numberWithCommas(data.deaths)
					document.getElementById('recovered').innerHTML=numberWithCommas(data.recovered)
					console.log(data);
				}).catch(function (err) {
					// There was an error
					console.warn('Something went wrong.', err);
				});
			}
			select.appendChild(option)
		}
	}
}).catch(function (err) {
	console.warn('Something went wrong.', err)
})

let select = document.getElementById('select');

select.addEventListener('change', event => {
  let checkedOption = [...event.target.children].find(c => c.selected);
	fetch(`https://corona.lmao.ninja/v2/countries/${checkedOption.text}`).then(function (response) {
		return response.json();
	}).then(function (data) {
		document.getElementById('cases').innerHTML=numberWithCommas(data.cases)
		document.getElementById('deaths').innerHTML=numberWithCommas(data.deaths)
		document.getElementById('recovered').innerHTML=numberWithCommas(data.recovered)
		console.log(data);
	}).catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	});
  console.log(checkedOption.text);
});

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
