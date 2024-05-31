let apiKey = "fa0446ac26e348te439ef9o29e1713b2";
let city = "Győr";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hour = date.getHours();
let minute = ("0" + date.getMinutes()).slice(-2);
let time = `${hour}:${minute}`;

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
  //console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  newTemperature.innerHTML = `${temperature}`;

  let responseCity = response.data.city;
  newCity.innerHTML = `${responseCity}`;

  let humidity = response.data.temperature.humidity;
  newHumidity.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 10) / 10;
  newWind.innerHTML = `${wind}km/h`;

  let emoji = response.data.condition.icon_url;
  newEmoji.src = `${emoji}`;

  let condition = response.data.condition.description;
  newCondition.innerHTML = `${condition}`;

  let cityForm = document.querySelector("#form");
  cityForm.addEventListener("submit", searchCity);

  getForecast(response.data.city);
}
async function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-field");
  console.log(cityInput.value);
  city = cityInput.value;
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let weatherData = await axios.get(apiUrl);
  if (weatherData.data.message == "City not found") {
    alert("City not found");
  } else {
    displayTemperature(weatherData);
  }
}
axios.get(apiUrl).then(displayTemperature);

function getForecast(city) {
  let apiKeyDaily = "fa0446ac26e348te439ef9o29e1713b2";
  let apiUrlDaily = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyDaily}&units=metric`;
  axios.get(apiUrlDaily).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log("response.data", response.data);
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row">
  <div class="col-2">
    <div class="date">
    ${formatDay(day.time)}
    </div>
    <div >
    <img class="forecastImage" src="${day.condition.icon_url}" />
    </div>
    <div class="temperature">
      <span class="tempSpanMax">${Math.round(
        day.temperature.maximum
      )}°</span> <span class="tempSpanMin"> ${Math.round(
          day.temperature.minimum
        )}°</span>
    </div>
  </div>
</div> `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
