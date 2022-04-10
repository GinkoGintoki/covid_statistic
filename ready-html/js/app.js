// 3D Scroll

let zSpacing = -1000,
		lastPos = zSpacing / 5,
		$frames = document.getElementsByClassName('frame'),
		frames = Array.from($frames),
		zVals = []

window.onscroll = function() {

	let top = document.documentElement.scrollTop,
			delta = lastPos - top

	lastPos = top

	frames.forEach(function(n, i) {
		zVals.push((i * zSpacing) + zSpacing)
		zVals[i] += delta * -5
		let frame = frames[i],
				transform = `translateZ(${zVals[i]}px)`,
				opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
			frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
			if (opacity == 0) {
				setTimeout(() => {
					frame.style.visibility = 'collapse'
				}, 300)
			} else if(opacity == 1) {
				setTimeout(() => {
					frame.style.visibility = 'visible'
				}, 300)
			}
	})

}

window.scrollTo(0, 1)

// Audio

let soundButton = document.querySelector('.soundbutton'),
		audio = document.querySelector('.audio');

audio.play()

soundButton.addEventListener('click', e => {
	soundButton.classList.toggle('paused')
	audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() {
	soundButton.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() {
	audio.pause()
}

// COVID API call

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
				fetch('https://corona.lmao.ninja/v2/countries/Kazakhstan').then(function (response) {
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