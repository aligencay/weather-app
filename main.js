const apiKey = "60628ce4711743a963ddadf2be9c6a70";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector("#error-null").style.display = "none";
    document.querySelector("#error-404").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/icons/clouds.svg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/icons/clear.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/icons/rain.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/icons/drizzle.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/icons/mist.svg";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatherIcon.src = "images/icons/thunderstorm.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/icons/snow.svg";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector("#error-404").style.display = "none";
    document.querySelector("#error-null").style.display = "none";
  }
}

const handleWeatherCheck = function () {
  if (
    searchBox.value === "" ||
    searchBox.value === null ||
    searchBox.value === undefined ||
    searchBox.value.trim() === ""
  ) {
    document.querySelector("#error-404").style.display = "none";
    document.querySelector("#error-null").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    checkWeather(searchBox.value);
  }
};

searchBtn.addEventListener("click", () => {
  handleWeatherCheck();
  searchBox.value = "";
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleWeatherCheck();
    searchBox.value = "";
  }
});

checkWeather();
