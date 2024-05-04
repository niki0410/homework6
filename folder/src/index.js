let apiKey = "fa0446ac26e348te439ef9o29e1713b2";
let city = "Győr";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

let date = new Date();
let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thuesday", "Friday", "Saturday"];
let day = days[date.getDay()];
let hour = date.getHours();
let minute = ('0' + date.getMinutes()).slice(-2);
let time = `${hour}:${minute}`
   

let newTemperature = document.querySelector(".celsius-text");
let newCity = document.querySelector(".city");
let newHumidity = document.querySelector(".humidity");
let newWind = document.querySelector(".wind");
let newEmoji = document.querySelector('[data-label="emojiImage"] img');
let newDay = document.querySelector(".day");
newDay.innerHTML = `${day}`;
let newTime = document.querySelector(".time");
newTime.innerHTML = `${time}`;
let newCondition = document.querySelector(".condition");


function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  newTemperature.innerHTML = `${temperature}`; 

  let responseCity = response.data.city;
  newCity.innerHTML = `${responseCity}`;
  
  let humidity = response.data.temperature.humidity;
  newHumidity.innerHTML = `${humidity}%`; 

  let wind = Math.round(response.data.wind.speed *10)/10;
  newWind.innerHTML = `${wind}km/h`; 

  let emoji = response.data.condition.icon_url;
  newEmoji.src = `${emoji}`;

  let condition = response.data.condition.description
  newCondition.innerHTML = `${condition}`;

  let cityForm = document.querySelector("#form");
  cityForm.addEventListener("submit", searchCity);
}
async function searchCity(event){
 
    event.preventDefault();
    let cityInput = document.querySelector("#input-field");
    console.log(cityInput.value)
    city = cityInput.value
    apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    console.log("Új:", apiUrl);
    let weatherData = await axios.get(apiUrl)
    if (weatherData.data.message== 'City not found') {
      alert('City not found')
    }else{
      displayTemperature(weatherData);
    }
  
 
}
axios.get(apiUrl).then(displayTemperature);



