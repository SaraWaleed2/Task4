let form = document.getElementById('weatherForm')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const countryF = document.getElementById('country')
const regionF = document.getElementById('region')
const conditionF = document.getElementById('condition')
const tempF = document.getElementById('temp')
const locationF = document.getElementById('location')
const longtitudeF = document.getElementById('long')
const latitudeF = document.getElementById('lat')


let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.innerText = data.error
            countryF.innerText = ""
            regionF.innerText = ""
            conditionF.innerText = ""
            tempF.innerText = ""
            longtitudeF.innerHTML = ""
            latitudeF.innerHTML = ""

        }
        else {
            countryF.innerText = data.country
            regionF.innerText = data.region
            conditionF.innerText = data.condition
            tempF.innerText = data.temp
            longtitudeF.innerHTML = data.longitude
            latitudeF.innerHTML = data.latitude
            errorF.innerText = ""
        }
    }
    catch (e) {
        console.log(e)
    }
}
