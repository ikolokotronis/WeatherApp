const apiKey = "f771e342fd1e419aa18102533222102"

const bodyQuery = document.querySelector('body')

const cityNameQuery = document.querySelector('.city__name')
const currentTempQuery = document.querySelector('.temperature__value')
const currentPressureQuery = document.querySelector('.pressure__value')
const currentHumidityQuery = document.querySelector('.humidity__value')
const currentWindSpeedQuery = document.querySelector('.wind-speed__value')
const weatherIconQuery = document.querySelector('.weather__icon')

const findCityForm = document.querySelector('.find-city')

const addCityButton = document.querySelector('#add-city')
const closeFormButton = document.querySelector('#close-form')
const closeCityButton = document.querySelector('#close_city')

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
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/clear-day.svg")
            }
            if (data.current.condition.text === "Clear"){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/clear-night.svg")
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/cloudy.svg")
            }
            if (data.current.condition.text === "Partly cloudy"){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/partly-cloudy-day.svg")
            }
            if (data.current.condition.text === "Fog"){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/fog.svg")
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/cloudy.svg")
            }
            if (data.current.condition.text.includes("rain")){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/rain.svg")
            }
            if (data.current.condition.text.includes("snow")){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/snow.svg")
            }
            if (data.current.condition.text.includes("thunder")){
                weatherIconQuery.firstElementChild.setAttribute("src", "assets/icons/thunderstorm.svg")
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

            let weatherIcon;

            if (data.current.condition.text === "Sunny"){
                weatherIcon = "assets/icons/clear-day.svg"
            }
            if (data.current.condition.text === "Clear"){
                weatherIcon = "assets/icons/clear-night.svg"
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            if (data.current.condition.text === "Partly cloudy"){
                weatherIcon = "assets/icons/partly-cloudy-day.svg"
            }
            if (data.current.condition.text === "Fog"){
                weatherIcon = "assets/icons/fog.svg"
            }
            if (data.current.condition.text === "Cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            if (data.current.condition.text.includes("rain")){
                weatherIcon = "assets/icons/rain.svg"
            }
            if (data.current.condition.text.includes("snow")){
                weatherIcon = "assets/icons/snow.svg"
            }
            if (data.current.condition.text.includes("thunder")){
                weatherIcon = "assets/icons/thunderstorm.svg"
            }

            const newDiv = document.createElement('div')
            newDiv.classList.add('module__weather')
            newDiv.innerHTML =
                `
                
            <div class="module module__weather">
                <button class="btn btn--icon btn--close close-city" id="close_city"><i class="material-icons">close</i></button>
        
                <div class="weather">
                    <div class="weather__icon"><img src="${weatherIcon}"/></div>
        
                    <div class="weather__info">
                        <div class="city">
                            <span class="city__name">${cityName}</span>
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

    document.addEventListener('click', function(e){
        if(e.target && e.target.parentElement.classList.contains('close-city')){
            e.target.parentElement.parentElement.remove()
        }
    });

})
