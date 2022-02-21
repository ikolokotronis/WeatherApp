const apiKey = "f771e342fd1e419aa18102533222102"

const bodyQuery = document.querySelector('body')

const cityNameQuery = document.querySelector('.city__name')
const currentTempQuery = document.querySelector('.temperature__value')
const currentPressureQuery = document.querySelector('.pressure__value')
const currentHumidityQuery = document.querySelector('.humidity__value')
const currentWindSpeedQuery = document.querySelector('.wind-speed__value')
const weatherIconQuery = document.querySelector('.weather__icon').firstElementChild
const dayQueries = document.querySelectorAll('.validDay')
const dayTempQueries = document.querySelectorAll('.validDayTemp')

const findCityForm = document.querySelector('.find-city')
const findCityFormContainer = document.querySelector('.module__form')

const addCityButton = document.querySelector('#add-city')
const closeFormButton = document.querySelector('#close-form')
const closeCityButton = document.querySelector('#close_city')

async function get_current_weather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`)
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

            let weatherIcon;

            if (data.current.condition.text.toLowerCase() === "sunny"){
                weatherIcon = "assets/icons/clear-day.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "clear"){
                weatherIcon = "assets/icons/clear-night.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
                     data.current.is_day === 1){
                weatherIcon = "assets/icons/partly-cloudy-day.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
                data.current.is_day === 0){
                weatherIcon = "assets/icons/partly-cloudy-night.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("fog")
                || data.current.condition.text.toLowerCase() === "overcast"
                || data.current.condition.text.toLowerCase() === "mist"){
                weatherIcon = "assets/icons/fog.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("rain") ||
                data.current.condition.text.toLowerCase().includes("drizzle")){
                weatherIcon = "assets/icons/rain.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("snow")){
                weatherIcon = "assets/icons/snow.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("thunder")){
                weatherIcon = "assets/icons/thunderstorm.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("sleet")){
                weatherIcon = "assets/icons/sleet.svg"
            }
            else if (data.current.condition.text.includes("blizzard")){
                weatherIcon = "assets/icons/snow.svg"
            }

            weatherIconQuery.src = weatherIcon

            let dayName = []
            let dayWeather = []
            let dayTemperature = []
            data.forecast.forecastday.forEach(element => {
                let day_name = new Date(element.date).toLocaleString('en-us', {weekday:'long'})
                dayName.push(day_name)
                return dayName
            })

            data.forecast.forecastday.forEach(element => {
                dayWeather.push(element.day.condition.text)
                return dayWeather
            })

            data.forecast.forecastday.forEach(element => {
                dayTemperature.push(element.day.avgtemp_c)
                return dayTemperature
            })

            dayQueries[0].innerText = "Today"
            dayQueries[1].innerText = dayName[1]
            dayQueries[2].innerText = dayName[2]

            dayTempQueries[0].innerText = dayTemperature[0]
            dayTempQueries[1].innerText = dayTemperature[1]
            dayTempQueries[2].innerText = dayTemperature[2]

            dayQueries[0].nextElementSibling.setAttribute('alt', dayWeather[0])
            dayQueries[1].nextElementSibling.setAttribute('alt', dayWeather[1])
            dayQueries[2].nextElementSibling.setAttribute('alt', dayWeather[2])

            dayQueries.forEach(day => {
                if (day.nextElementSibling.alt.toLowerCase() === "sunny"){
                    day.nextElementSibling.src = "assets/icons/clear-day.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase() === "clear"){
                    day.nextElementSibling.src = "assets/icons/clear-night.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase() === "cloudy"){
                    day.nextElementSibling.src = "assets/icons/cloudy.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase() === "partly cloudy"){
                    day.nextElementSibling.src = "assets/icons/partly-cloudy-day.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase().includes("fog")
                    || day.nextElementSibling.alt.toLowerCase() === "overcast"
                    || day.nextElementSibling.alt.toLowerCase() === "mist"){
                    day.nextElementSibling.src = "assets/icons/fog.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase() === "cloudy"){
                    day.nextElementSibling.src = "assets/icons/cloudy.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase().includes("rain") ||
                    day.nextElementSibling.alt.toLowerCase().includes("drizzle")){
                    day.nextElementSibling.src = "assets/icons/rain.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase().includes("snow")){
                    day.nextElementSibling.src = "assets/icons/snow.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase().includes("thunder")){
                    day.nextElementSibling.src = "assets/icons/thunderstorm.svg"
                }
                else if (day.nextElementSibling.alt.toLowerCase().includes("sleet")){
                    day.nextElementSibling.src = "assets/icons/sleet.svg"
                }
                else if (day.nextElementSibling.alt.includes("blizzard")){
                    day.nextElementSibling.src = "assets/icons/snow.svg"
                }

            })

        })

    addCityButton.addEventListener('click', event => {
        findCityFormContainer.removeAttribute('hidden')
    })

    closeFormButton.addEventListener('click', event => {
        findCityFormContainer.setAttribute('hidden', true)
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
            bodyQuery.classList.remove('loading')
            const cityName = data.location.name
            const currentTemp = data.current.temp_c
            const currentPressure = `${data.current.pressure_mb} hPa`
            const currentHumidity = `${data.current.humidity}%`
            const currentWindSpeed = `${data.current.wind_kph} km/h`

            let weatherIcon;

            if (data.current.condition.text.toLowerCase() === "sunny"){
                weatherIcon = "assets/icons/clear-day.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "clear"){
                weatherIcon = "assets/icons/clear-night.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
                data.current.is_day === 1){
                weatherIcon = "assets/icons/partly-cloudy-day.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
                data.current.is_day === 0){
                weatherIcon = "assets/icons/partly-cloudy-night.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("fog")
                     || data.current.condition.text.toLowerCase() === "overcast"
                     || data.current.condition.text.toLowerCase() === "mist"){
                weatherIcon = "assets/icons/fog.svg"
            }
            else if (data.current.condition.text.toLowerCase() === "cloudy"){
                weatherIcon = "assets/icons/cloudy.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("rain") ||
                     data.current.condition.text.toLowerCase().includes("drizzle")){
                weatherIcon = "assets/icons/rain.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("snow")){
                weatherIcon = "assets/icons/snow.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("thunder")){
                weatherIcon = "assets/icons/thunderstorm.svg"
            }
            else if (data.current.condition.text.toLowerCase().includes("sleet")){
                weatherIcon = "assets/icons/sleet.svg"
            }
            else if (data.current.condition.text.includes("blizzard")){
                weatherIcon = "assets/icons/snow.svg"
            }

            let dayName = []
            let dayWeather = []
            let dayTemperature = []
            data.forecast.forecastday.forEach(element => {
                let day_name = new Date(element.date).toLocaleString('en-us', {weekday:'long'})
                dayName.push(day_name)
                return dayName
            })

            data.forecast.forecastday.forEach(element => {
                dayWeather.push(element.day.condition.text)
                return dayWeather
            })

            data.forecast.forecastday.forEach(element => {
                dayTemperature.push(element.day.avgtemp_c)
                return dayTemperature
            })

            let futureWeatherIcons = []

            dayWeather.forEach(element => {
                if (element.toLowerCase() === "sunny"){
                    futureWeatherIcons.push("../assets/icons/clear-day.svg")

                }
                else if (element.toLowerCase() === "clear"){
                    futureWeatherIcons.push("../assets/icons/clear-night.svg")
                }
                else if (element.toLowerCase() === "cloudy"){
                    futureWeatherIcons.push("../assets/icons/cloudy.svg")
                }
                else if (element.toLowerCase() === "partly cloudy"){
                    futureWeatherIcons.push("../assets/icons/partly-cloudy-day.svg")
                }
                else if (element.toLowerCase().includes("fog") ||
                         element.toLowerCase() === "overcast" ||
                         element.toLowerCase() === "mist"){
                    futureWeatherIcons.push("../assets/icons/fog.svg")
                }
                else if (element.toLowerCase() === "cloudy"){
                    futureWeatherIcons.push("../assets/icons/cloudy.svg")
                }
                else if (element.toLowerCase().includes("rain") ||
                         element.toLowerCase().includes("drizzle")){
                    futureWeatherIcons.push("../assets/icons/rain.svg")
                }
                else if (element.toLowerCase().includes("snow")){
                    futureWeatherIcons.push("../assets/icons/snow.svg")
                }
                else if (element.toLowerCase().includes("thunder")){
                    futureWeatherIcons.push("../assets/icons/thunderstorm.svg")
                }
                else if (element.toLowerCase().includes("sleet")){
                    futureWeatherIcons.push("../assets/icons/sleet.svg")
                }
                else if (element.includes("blizzard")){
                    futureWeatherIcons.push("../assets/icons/snow.svg")
                }
                return futureWeatherIcons
            })


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
                            <span class="day">Today</span> <img src="${futureWeatherIcons[0]}"/>
                            <span class="temperature"><span class="temperature__value">${dayTemperature[0]}</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">${dayName[1]}</span> <img src="${futureWeatherIcons[1]}"/>
                            <span class="temperature"><span class="temperature__value">${dayTemperature[1]}</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">${dayName[2]}</span> <img src="${futureWeatherIcons[2]}"/>
                            <span class="temperature"><span class="temperature__value">${dayTemperature[2]}</span>&deg;C</span>
                            </li>
        
                        <li>
                            <span class="day">Next day</span> <img src="../assets/icons/partly-cloudy-day.svg"/>
                            <span class="temperature"><span class="temperature__value">5.0</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">Next day</span> <img src="../assets/icons/clear-day.svg"/>
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
