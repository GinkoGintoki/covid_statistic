let cityId = null

// get all city
const allCity = fetch('http://127.0.0.1:8080/api/city/all').then(function (response) {
	return response.json();
}).then(function (data) {
	const select = document.getElementById('selectCity')
	console.log(data)
	for (let i=0; i < data.length; i++) {
        var option = document.createElement('option')
        option.value = data[i].id
        option.text = data[i].name
        if (i === 0) {
            cityId = data[i].id
            let date = new Date(data[i].dtUpdate);
            option.selected = 'selected'
            // get info city
            const selectHospital = document.getElementById('selectHospital')


            document.getElementById('cityCases').innerHTML=numberWithCommas(data[i].totalCases)
            document.getElementById('cityDeaths').innerHTML=numberWithCommas(data[i].totalDeaths)
            document.getElementById('cityRecoveries').innerHTML=numberWithCommas(data[i].totalRecoveries)
            document.getElementById('cityUpdateDate').innerHTML= date.toLocaleDateString()

            fetch(`http://127.0.0.1:8080/api/hospital/info/city/get/${data[i].id}`).then(function(response) {return response.json();}).then(function(data) {
        
                for (let i=0; i < data.length; i++) {
                    var opt = document.createElement('option')
                    opt.value = data[i].id
                    opt.text = data[i].name
                    if(data[i].id===1) {
                        opt.selected='selected'
                        document.getElementById('hospitalCases').innerHTML=numberWithCommas(data[i].totalCases)
                        document.getElementById('hospitalDeaths').innerHTML=numberWithCommas(data[i].totalDeaths)
                        document.getElementById('hospitalRecoveries').innerHTML=numberWithCommas(data[i].totalRecoveries)
                        let date = new Date(data[i].dtUpdate)
                        document.getElementById('hospitalUpdateDate').innerHTML=date.toLocaleDateString()
                    }
                    selectHospital.appendChild(opt)
                }
            })
        }
        select.appendChild(option)
	}
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

let selectCity = document.getElementById('selectCity');

selectCity.addEventListener('change', event => {
  let checkedOption = [...event.target.children].find(c => c.selected);
        cityId = checkedOption.value
	fetch(`http://127.0.0.1:8080/api/city/info/get/${checkedOption.value}`).then(function (response) {
		return response.json();
	}).then(function (data) {
		document.getElementById('cityCases').innerHTML=numberWithCommas(data.totalCases)
		document.getElementById('cityDeaths').innerHTML=numberWithCommas(data.totalDeaths)
		document.getElementById('cityRecoveries').innerHTML=numberWithCommas(data.totalRecoveries)
        console.log(data, 'date')
        let date = new Date(data.dtUpdate)
        document.getElementById('cityUpdateDate').innerHTML=date.toLocaleDateString()

        fetch(`http://127.0.0.1:8080/api/hospital/info/city/get/${cityId}`).then(function(response) {return response.json();}).then(function(data) {
            var options = document.querySelectorAll('#selectHospital option');
            options.forEach(o => o.remove());
            const selectHospital = document.getElementById('selectHospital')
            for (let i=0; i < data.length; i++) {
                var opt = document.createElement('option')
                opt.value = data[i].id
                opt.text = data[i].name
                if(i === 0) {
                    opt.selected='selected'
                    document.getElementById('hospitalCases').innerHTML=numberWithCommas(data[i].totalCases)
                    document.getElementById('hospitalDeaths').innerHTML=numberWithCommas(data[i].totalDeaths)
                    document.getElementById('hospitalRecoveries').innerHTML=numberWithCommas(data[i].totalRecoveries)
                    let date = new Date(data[i].dtUpdate)
                    document.getElementById('hospitalUpdateDate').innerHTML=date.toLocaleDateString()
                }
                selectHospital.appendChild(opt)
            }
        })
	}).catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	});
  console.log(checkedOption.text);
});

console.log(cityId, 'selected')

let selectHospital = document.getElementById('selectHospital')

selectHospital.addEventListener('change', event => {
    let checkedOption = [...event.target.children].find(c => c.selected);
        fetch(`http://127.0.0.1:8080/api/hospital/info/get?hospital=${checkedOption.value}&city=${cityId}`).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data, 'infoSelectedHospital')
            document.getElementById('hospitalCases').innerHTML=numberWithCommas(data.totalCases)
            document.getElementById('hospitalDeaths').innerHTML=numberWithCommas(data.totalDeaths)
            document.getElementById('hospitalRecoveries').innerHTML=numberWithCommas(data.totalRecoveries)
            let date = new Date(data.dtUpdateTotal)
            document.getElementById('hospitalUpdateDate').innerHTML=date.toLocaleDateString()
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
});


function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}