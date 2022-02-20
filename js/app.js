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


})
