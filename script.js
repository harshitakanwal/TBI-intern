const cityName = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_date_time");
const w_forecast = document.querySelector(".weather_forecast");
const w_icon = document.querySelector(".weather_icon");
const w_temperature = document.querySelector(".weather_temperature");
const w_minTem = document.querySelector(".weather_min");
const w_maxTem = document.querySelector(".weather_max");

const w_feelsLike = document.querySelector(".weather_feelsLike");
const w_humidity = document.querySelector(".weather_humidity");
const w_wind = document.querySelector(".weather_wind");
const w_pressure = document.querySelector(".weather_pressure");

const search = document.querySelector(".icon_click");
let citySearch = document.querySelector(".weather_search");
let city = 'Almora';

const key = "7c69bce6b818a90979d6431c0735c2e3";

//to convert country code to country name
const getCountryName = (code) => {
    const regionNamesEnglish = new Intl.DisplayNames([code], {type: 'region'});
    return regionNamesEnglish.of(code);
};

//to format date time day
const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000);
    console.log(currDate);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('en-US' , options);
    
    return formatter.format(currDate);
}

const submitFunc= (e)=> {
    e.preventDefault();

    const cityName = document.querySelector(".city_name");
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
}
 
//search functionality
citySearch.addEventListener('submit', (e)=>{
    submitFunc(e);
});

//onclick search functionality
search.addEventListener('click',(e)=>{
    submitFunc(e);
});

//api call
const getWeatherData = async() => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    try{
        const res = await fetch(URL);
        const data = await res.json();

        const {main, dt, weather, name, wind, sys} = data;
        
        cityName.innerText = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerText = getDateTime(dt); 
        w_temperature.innerHTML = `${main.temp}&#176C`;
        w_minTem.innerHTML = `Min: ${main.temp_min}&#176C`;
        w_maxTem.innerHTML = `Max: ${main.temp_max}&#176C`;
        
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"></img>`;
        w_forecast.innerHTML = `${weather[0].main}`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    }catch(err){
        cityName.innerText = `City Not Found Error`;
        console.log(err);
    }
}

document.body.addEventListener("load",getWeatherData());