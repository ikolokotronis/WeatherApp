const apiKey = "f771e342fd1e419aa18102533222102"

const cityNameQuery = document.querySelector('.city__name')
const currentTempQuery = document.querySelector('#current_temperature_value')
const currentPressureQuery = document.querySelector('.pressure__value')
const currentHumidityQuery = document.querySelector('.humidity__value')
const currentWindSpeedQuery = document.querySelector('.wind-speed__value')
const weatherIconQuery = document.querySelector('.weather__icon').firstElementChild
const bodyQuery = document.querySelector('body')

const findCityForm = document.querySelector('.find-city')
const addCityButton = document.querySelector('#add-city')
const closeCityButton = document.querySelector('#close-city')
const closeFormButton = document.querySelector('#close-form')

async function get_current_weather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`)
    return await response.json()
}

bodyQuery.classList.add('loading')

document.addEventListener('DOMContentLoaded', event => {

    get_current_weather("auto:ip")
        .then(data => {
            console.log(data)
            bodyQuery.classList.remove('loading')
            cityNameQuery.innerText = data.location.name
            currentTempQuery.innerText = data.current.temp_c
            currentPressureQuery.innerText = `${data.current.pressure_mb} hPa`
            currentHumidityQuery.innerText = `${data.current.humidity}%`
            currentWindSpeedQuery.innerText = `${data.current.wind_kph} km/h`
            if (data.current.condition.text === "Sunny"){
                weatherIconQuery.setAttribute("src", "assets/icons/clear-day.svg")
            }
            if (data.current.condition.text === "Clear"){
                weatherIconQuery.setAttribute("src", "assets/icons/clear-night.svg")
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIconQuery.setAttribute("src", "assets/icons/cloudy.svg")
            }
            if (data.current.condition.text === "Partly cloudy"){
                weatherIconQuery.setAttribute("src", "assets/icons/partly-cloudy-day.svg")
            }
            if (data.current.condition.text === "Fog"){
                weatherIconQuery.setAttribute("src", "assets/icons/fog.svg")
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIconQuery.setAttribute("src", "assets/icons/cloudy.svg")
            }
            if (data.current.condition.text.includes("rain")){
                weatherIconQuery.setAttribute("src", "assets/icons/rain.svg")
            }
            if (data.current.condition.text.includes("snow")){
                weatherIconQuery.setAttribute("src", "assets/icons/snow.svg")
            }
            if (data.current.condition.text.includes("thunder")){
                weatherIconQuery.setAttribute("src", "assets/icons/thunderstorm.svg")
            }

        })

    addCityButton.addEventListener('click', event => {
        document.querySelector('.module__form').removeAttribute('hidden')
    })

    closeFormButton.addEventListener('click', event => {
        document.querySelector('.module__form').setAttribute('hidden', true)
    })

    closeCityButton.addEventListener('click', event => {
        event.target.parentElement.parentElement.remove()
        console.log('clicked')
    })

    findCityForm.addEventListener('submit', event => {
        bodyQuery.classList.add('loading')
        event.preventDefault()
        const searchInputValue = document.querySelector('#search').value
        const appContainer = document.querySelector('#app')
        get_current_weather(searchInputValue).then(data => {
            console.log(data)
            bodyQuery.classList.remove('loading')
            const cityName = data.location.name
            const currentTemp = data.current.temp_c
            const currentPressure = `${data.current.pressure_mb} hPa`
            const currentHumidity = `${data.current.humidity}%`
            const currentWindSpeed = `${data.current.wind_kph} km/h`

            const newDiv = document.createElement('div')
            newDiv.classList.add('module__weather')
            newDiv.innerHTML =
                `
                
            <div class="module module__weather">
                <button class="btn btn--icon btn--close closeCity"><i class="material-icons">close</i></button>
        
                <div class="weather">
                    <div class="weather__icon"><img src=""/></div>
        
                    <div class="weather__info">
                        <div class="city">
                            <span class="city__name">${cityName}</span> <span class="btn btn--icon"><i class="material-icons">edit</i></span>
                        </div>
                        <div class="temperature"><span id="current_temperature_value" class="temperature__value">${currentTemp}</span>&deg;C</div>
                    </div>
        
                    <ul class="weather__details">
                        <li><img src="../assets/icons/pressure.svg"/> <span class="pressure__value">${currentPressure}</span></li>
                        <li><img src="../assets/icons/humidity.svg"/> <span class="humidity__value">${currentHumidity}</span></li>
                        <li><img src="../assets/icons/wind-speed.svg"/> <span class="wind-speed__value">${currentWindSpeed}</span></li>
                    </ul>
        
                    <ul class="weather__forecast">
                        <li>
                            <span class="day">Tuesday</span> <img src="../assets/icons/clear-day.svg"/>
                            <span class="temperature"><span class="temperature__value">10.0</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">Wednesday</span> <img src="../assets/icons/snow.svg"/>
                            <span class="temperature"><span class="temperature__value">-2.3</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">Thursday</span> <img src="../assets/icons/rain.svg"/>
                            <span class="temperature"><span class="temperature__value">4.8</span>&deg;C</span>
                            </li>
        
                        <li>
                            <span class="day">Friday</span> <img src="../assets/icons/cloudy.svg"/>
                            <span class="temperature"><span class="temperature__value">5.0</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">Saturday</span> <img src="../assets/icons/hail.svg"/>
                            <span class="temperature"><span class="temperature__value">8.6</span>&deg;C</span>
                        </li>
                    </ul>
                </div>
            </div>
       
                `
            appContainer.append(newDiv)
        })

    })

})
