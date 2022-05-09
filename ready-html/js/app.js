// 3D Scroll

let zSpacing = -900,
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

// Kazakhstan Local Data