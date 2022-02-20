const api_key = "c5258b50eccf4402bec95003222002"

const city_name_query = document.querySelector('.city__name')
const current_temp_query = document.querySelector('#current_temperature_value')
const current_pressure_query = document.querySelector('.pressure__value')
const current_humidity_query = document.querySelector('.humidity__value')
const current_wind_speed_query = document.querySelector('.wind-speed__value')
const weather_icon_query = document.querySelector('.weather__icon').firstElementChild
const body_query = document.querySelector('body')

const add_city_button = document.querySelector('#add-city')
const find_city_form = document.querySelector('.find-city')
const remove_city_button = document.querySelector('#delete-city')

async function get_current_weather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`)
    return await response.json()
}

body_query.classList.add('loading')

document.addEventListener('DOMContentLoaded', event => {

    get_current_weather("auto:ip")
        .then(data => {
            body_query.classList.remove('loading')
            city_name_query.innerText = data.location.name
            current_temp_query.innerText = data.current.temp_c
            current_pressure_query.innerText = `${data.current.pressure_mb} hPa`
            current_humidity_query.innerText = `${data.current.humidity}%`
            current_wind_speed_query.innerText = `${data.current.wind_kph} km/h`
            if (data.current.condition.text.includes("rain")){
                weather_icon_query.setAttribute("src", "assets/icons/rain.svg")
            }
            if (data.current.condition.text === "Partly cloudy"){
                weather_icon_query.setAttribute("src", "assets/icons/partly-cloudy-day.svg")
            }

        })

    let click_counter = 0
    add_city_button.addEventListener('click', event => {
        click_counter += 1
        if (click_counter % 2 === 0){
            document.querySelector('.module__form').setAttribute('hidden', true)
        }
        else{
            document.querySelector('.module__form').removeAttribute('hidden')
        }
    })

    remove_city_button.addEventListener('click', event => {
        event.target.parentElement.parentElement.remove()
    })

    find_city_form.addEventListener('submit', event => {
        body_query.classList.add('loading')
        event.preventDefault()
        const searchInputValue = document.querySelector('#search').value
        const appContainer = document.querySelector('#app')
        get_current_weather(searchInputValue).then(data => {
            console.log(data)
            body_query.classList.remove('loading')
            const city_name = data.location.name
            const current_temp = data.current.temp_c
            const current_pressure = `${data.current.pressure_mb} hPa`
            const current_humidity = `${data.current.humidity}%`
            const current_wind_speed = `${data.current.wind_kph} km/h`

            const new_div = document.createElement('div')
            new_div.classList.add('module__weather')
            new_div.innerHTML =
                `
                
            <div class="module module__weather">
                <button class="btn btn--icon btn--close"><i class="material-icons">close</i></button>
        
                <div class="weather">
                    <div class="weather__icon"><img src=""/></div>
        
                    <div class="weather__info">
                        <div class="city">
                            <span class="city__name">${city_name}</span> <span class="btn btn--icon"><i class="material-icons">edit</i></span>
                        </div>
                        <div class="temperature"><span id="current_temperature_value" class="temperature__value">${current_temp}</span>&deg;C</div>
                    </div>
        
                    <ul class="weather__details">
                        <li><img src="../assets/icons/pressure.svg"/> <span class="pressure__value">${current_pressure}</span></li>
                        <li><img src="../assets/icons/humidity.svg"/> <span class="humidity__value">${current_humidity}</span></li>
                        <li><img src="../assets/icons/wind-speed.svg"/> <span class="wind-speed__value">${current_wind_speed}</span></li>
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

            appContainer.append(new_div)

        })

    })

})
