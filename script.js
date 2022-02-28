// Api base url
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Key
// ceab25b8b5860c0fe1ac6a28022389f1

const weatherApi = {
    key: "ceab25b8b5860c0fe1ac6a28022389f1",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById("input-box");


// Event Listener Function 

searchInputBox.addEventListener('keypress', (e) => {

    if(e.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherData(searchInputBox.value);
        let container = document.querySelector(".container");
        container.style.display="block";
    }
})


// Get weather data

function getWeatherData(city) {

    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`).then(weather => {
        return weather.json();
    }).then(showWeatherData);

}


// show weather data 

function showWeatherData(weather){

    
    // console.log(weather);

    // Area 1

    let city = document.getElementById("city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let lat_long = document.getElementById("lat_long");
    lat_long.innerHTML = `${weather.coord.lat} / ${weather.coord.lon}`;


    // Area 2

    let temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    // Area 3
    
    let humidity = document.getElementById("humidity");
    humidity.innerText = `${weather.main.humidity}%`;
    
    let pressure = document.getElementById("pressure");
    pressure.innerText = `${weather.main.pressure}`;

    let wind = document.getElementById("wind");
    wind.innerText = `${weather.wind.speed} km/hr `;
    
    
    // Date
    let  date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    

}


// date manage 

function dateManage(dateArg){

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `Last updated: ${day}, ${date} ${month} ${year}`;
}