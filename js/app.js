const apiKey = "f771e342fd1e419aa18102533222102";

const bodyQuery = document.querySelector('body');

const cityNameQuery = document.querySelector('.city__name');
const currentTempQuery = document.querySelector('.temperature__value');
const currentPressureQuery = document.querySelector('.pressure__value');
const currentHumidityQuery = document.querySelector('.humidity__value');
const currentWindSpeedQuery = document.querySelector('.wind-speed__value');
const weatherIconQuery = document.querySelector('.weather__icon').firstElementChild;
const searchErrorQuery = document.querySelector('.search-error')

const dayQueries = document.querySelectorAll('.validDay');
const dayTempQueries = document.querySelectorAll('.validDayTemp');

const findCityForm = document.querySelector('.find-city');
const findCityFormContainer = document.querySelector('.module__form');

const appContainer = document.querySelector('#app');

const addCityButton = document.querySelector('#add-city');
const closeFormButton = document.querySelector('#close-form');
const closeCityButton = document.querySelector('#close_city');

async function get_current_weather(city){
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
        return await response.json();
    }
    catch(error){
        console.log("An error occurred, it probably has to do with the api key");
    }
}


class RenderWeatherData{

    get_current_weather(data){
        if (data.current.condition.text.toLowerCase() === "sunny"){
            return "assets/icons/clear-day.svg";
        }
        else if (data.current.condition.text.toLowerCase() === "clear"){
            return "assets/icons/clear-night.svg";
        }
        else if (data.current.condition.text.toLowerCase() === "cloudy"){
            return "assets/icons/cloudy.svg";
        }
        else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
            data.current.is_day === 1){
            return "assets/icons/partly-cloudy-day.svg";
        }
        else if (data.current.condition.text.toLowerCase() === "partly cloudy" &&
            data.current.is_day === 0){
            return "assets/icons/partly-cloudy-night.svg";
        }
        else if (data.current.condition.text.toLowerCase().includes("fog") ||
            data.current.condition.text.toLowerCase() === "overcast" ||
            data.current.condition.text.toLowerCase() === "mist"){
            return "assets/icons/fog.svg";
        }
        else if (data.current.condition.text.toLowerCase() === "cloudy"){
            return "assets/icons/cloudy.svg";
        }
        else if (data.current.condition.text.toLowerCase().includes("rain") ||
            data.current.condition.text.toLowerCase().includes("drizzle")){
            return "assets/icons/rain.svg";
        }
        else if (data.current.condition.text.toLowerCase().includes("snow") ||
            data.current.condition.text.toLowerCase().includes("blizzard")){
            return "assets/icons/snow.svg";
        }
        else if (data.current.condition.text.toLowerCase().includes("thunder")){
            return "assets/icons/thunderstorm.svg";
        }
        else if (data.current.condition.text.toLowerCase().includes("sleet")){
            return "assets/icons/sleet.svg";

        }
        return "Wrong data";
    }

    get_future_weather(dayWeatherConditions){

        let futureWeatherIcons = [];

        dayWeatherConditions.forEach(weatherCondition => {
            if (weatherCondition.toLowerCase() === "sunny"){
                futureWeatherIcons.push("../assets/icons/clear-day.svg");
            }
            else if (weatherCondition.toLowerCase() === "clear"){
                futureWeatherIcons.push("../assets/icons/clear-night.svg");
            }
            else if (weatherCondition.toLowerCase() === "cloudy"){
                futureWeatherIcons.push("../assets/icons/cloudy.svg");
            }
            else if (weatherCondition.toLowerCase() === "partly cloudy"){
                futureWeatherIcons.push("../assets/icons/partly-cloudy-day.svg");
            }
            else if (weatherCondition.toLowerCase().includes("fog") ||
                     weatherCondition.toLowerCase() === "overcast" ||
                     weatherCondition.toLowerCase() === "mist"){
                futureWeatherIcons.push("../assets/icons/fog.svg");
            }
            else if (weatherCondition.toLowerCase() === "cloudy"){
                futureWeatherIcons.push("../assets/icons/cloudy.svg");
            }
            else if (weatherCondition.toLowerCase().includes("rain") ||
                     weatherCondition.toLowerCase().includes("drizzle")){
                futureWeatherIcons.push("../assets/icons/rain.svg");
            }
            else if (weatherCondition.toLowerCase().includes("snow") ||
                     weatherCondition.toLowerCase().includes("blizzard")){
                futureWeatherIcons.push("../assets/icons/snow.svg");
            }
            else if (weatherCondition.toLowerCase().includes("thunder")){
                futureWeatherIcons.push("../assets/icons/thunderstorm.svg");
            }
            else if (weatherCondition.toLowerCase().includes("sleet")){
                futureWeatherIcons.push("../assets/icons/sleet.svg");
            }

        });

        return futureWeatherIcons
    }

    get_day_names(data){
        let dayNames = []
        data.forecast.forecastday.forEach(element => {
            let day_name = new Date(element.date).toLocaleString('en-us', {weekday:'long'});
            dayNames.push(day_name);
        });
        return dayNames;
    }

    get_weather_conditions(data){
        let dayWeatherConditions = []
        data.forecast.forecastday.forEach(element => {
            dayWeatherConditions.push(element.day.condition.text);
        });
        return dayWeatherConditions;
    }

    get_temperatures(data){
        let dayTemperatures = []
        data.forecast.forecastday.forEach(element => {
            dayTemperatures.push(element.day.avgtemp_c);
        });
        return dayTemperatures;
    }
}

const getWeatherData = new RenderWeatherData()

bodyQuery.classList.add('loading');

document.addEventListener('DOMContentLoaded', event => {

    get_current_weather("auto:ip")
        .then(data => {
            bodyQuery.classList.remove('loading');
            cityNameQuery.innerText = data.location.name;
            currentTempQuery.innerText = data.current.temp_c;
            currentPressureQuery.innerText = `${data.current.pressure_mb} hPa`;
            currentHumidityQuery.innerText = `${data.current.humidity}%`;
            currentWindSpeedQuery.innerText = `${data.current.wind_kph} km/h`;

            weatherIconQuery.src = getWeatherData.get_current_weather(data);

            const futureDayNames = getWeatherData.get_day_names(data)

            const futureWeatherConditions = getWeatherData.get_weather_conditions(data)

            const futureTemperatures = getWeatherData.get_temperatures(data)

            dayQueries[0].innerText = "Today";
            dayQueries[1].innerText = futureDayNames[1];
            dayQueries[2].innerText = futureDayNames[2];

            dayTempQueries[0].innerText = futureTemperatures[0];
            dayTempQueries[1].innerText = futureTemperatures[1];
            dayTempQueries[2].innerText = futureTemperatures[2];

            dayQueries[0].nextElementSibling.setAttribute('alt', futureWeatherConditions[0]);
            dayQueries[1].nextElementSibling.setAttribute('alt', futureWeatherConditions[1]);
            dayQueries[2].nextElementSibling.setAttribute('alt', futureWeatherConditions[2]);

            let imgAltValues = []

            dayQueries.forEach(day => {
                imgAltValues.push(day.nextElementSibling.alt)
                return imgAltValues
            })

            const futureWeatherIcons = getWeatherData.get_future_weather(imgAltValues)

            dayQueries[0].nextElementSibling.setAttribute('src', futureWeatherIcons[0]);
            dayQueries[1].nextElementSibling.setAttribute('src', futureWeatherIcons[1]);
            dayQueries[2].nextElementSibling.setAttribute('src', futureWeatherIcons[2]);

        }).catch(error => {

            console.log("An error occurred while fetching your IP")

    });

    findCityForm.addEventListener('submit', event => {

        bodyQuery.classList.add('loading');

        event.preventDefault();

        const searchInputValue = document.querySelector('#search').value;

        get_current_weather(searchInputValue)
            .then(data => {
            bodyQuery.classList.remove('loading');
            const cityName = data.location.name;
            const currentTemp = data.current.temp_c;
            const currentPressure = `${data.current.pressure_mb} hPa`;
            const currentHumidity = `${data.current.humidity}%`;
            const currentWindSpeed = `${data.current.wind_kph} km/h`;

            const futureDayNames = getWeatherData.get_day_names(data)

            const futureWeatherConditions = getWeatherData.get_weather_conditions(data)

            const futureTemperatures = getWeatherData.get_temperatures(data)

            const futureWeatherIcons = getWeatherData.get_future_weather(futureWeatherConditions)

            const newDiv = document.createElement('div');
            newDiv.classList.add('module__weather');
            newDiv.innerHTML =

                `
            <div class="module module__weather">
                <button class="btn btn--icon btn--close close-city" id="close_city"><i class="material-icons">close</i></button>
        
                <div class="weather">
                    <div class="weather__icon"><img src="${getWeatherData.get_current_weather(data)}"/></div>
        
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
                            <span class="temperature"><span class="temperature__value">${futureTemperatures[0]}</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">${futureDayNames[1]}</span> <img src="${futureWeatherIcons[1]}"/>
                            <span class="temperature"><span class="temperature__value">${futureTemperatures[1]}</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">${futureDayNames[2]}</span> <img src="${futureWeatherIcons[2]}"/>
                            <span class="temperature"><span class="temperature__value">${futureTemperatures[2]}</span>&deg;C</span>
                            </li>
        
                        <li>
                            <span class="day">Not available</span> <img src="../assets/icons/clear-day.svg"/>
                            <span class="temperature"><span class="temperature__value">0</span>&deg;C</span>
                        </li>
        
                        <li>
                            <span class="day">Not available</span> <img src="../assets/icons/clear-day.svg"/>
                            <span class="temperature"><span class="temperature__value">0</span>&deg;C</span>
                        </li>
                    </ul>
                </div>
            </div>
                `

            appContainer.append(newDiv);
            event.target.reset()

        }).catch(error => {

            searchErrorQuery.innerText = "An error occurred, please try again"

        });

    });

    addCityButton.addEventListener('click', event => {
        findCityFormContainer.removeAttribute('hidden');
    });

    closeFormButton.addEventListener('click', event => {
        findCityFormContainer.setAttribute('hidden', true);
    });

    closeCityButton.addEventListener('click', event => {
        event.target.parentElement.parentElement.remove();
    });

    document.addEventListener('click', function(event){
        if(event.target && event.target.parentElement.classList.contains('close-city')){
            event.target.parentElement.parentElement.remove();
        }
    });

})
