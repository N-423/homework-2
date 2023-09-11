const baseUrl = `https://api.weatherapi.com/v1/forecast.json?key=`;
const key = `3dda85261bf444dfa5a204818232808`;

let loc = {};
let current = {};
let forecast = [];

let measurement = imperial;

function updateView() {
  $(".section-container").css("display", "flex")
  $(".location-text").html(`${loc.name}`);

  $(".main-weather").html(`${current.condition.text}`);
  $(".main-weather-icn").attr("src", current.condition.icon);

  $(".day-forecast-header").html(`${forecast.forecastday.length}-Day Forecast`);
  $(".day-forecast").html(``);

  $(".wind-direction").html(`Direction: ${current.wind_degree}° ${current.wind_dir}`);

  $(".millibars").html(`Millibars: ${current.pressure_mb}mb`);

  $(".pressure-inches").html(`Inches: ${current.pressure_in}"`);

  $(".humidity").html(`Humidity: ${current.humidity}%`);

  $(".uv").html(`UV Index: ${current.uv}`);

  if (measurement == "metric") {
    $(".main-temp").html(`${current.temp_c}°`);

    $(".high-temp").html(`H: ${forecast.forecastday[0].day.maxtemp_c}°`);
    $(".low-temp").html(`L: ${forecast.forecastday[0].day.mintemp_c}°`);

    $(".forecast-grid").html(``);
    $.each(forecast.forecastday[0].hour, (idx, hour) => {
      $(".forecast-grid").append(`<div class="forecast-element">
    <p class="forecast-time">${hour.time.slice(-5)}</p>
    <img class="forecast-icn" src="${hour.condition.icon}" alt="" />
    <p class="forecast-temp">${hour.temp_c}°</p>
  </div>`)
    })

    $.each(forecast.forecastday, (idx, day) => {
      if (idx == 0) {
        $(".day-forecast").append(`<div class="day-forecast-row">
                <p class="day-forecast-date">Today</p>
                <img src="${day.day.condition.icon}" alt="" />
                <div class="day-forecast-highlow">
                  <p>L: ${day.day.mintemp_c}°</p>
                  <p>H: ${day.day.maxtemp_c}°</p>
                </div>
              </div>`)
      } else {
        $(".day-forecast").append(`<div class="day-forecast-row">
                <p class="day-forecast-date">${day.date}</p>
                <img src="${day.day.condition.icon}" alt="" />
                <div class="day-forecast-highlow">
                  <p>L: ${day.day.mintemp_c}°</p>
                  <p>H: ${day.day.maxtemp_c}°</p>
                </div>
              </div>`)
      }
    })

    $(".wind-speed").html(`Speed: ${current.wind_kph}kmph`);

    $(".precip").html(`Precipitation: ${current.precip_mm}mm`);

    $(".feels-like").html(`Feels Like: ${current.feelslike_c}°`);

    $(".visibility").html(`Visibility: ${current.vis_km}km`);
  } else {
    $(".main-temp").html(`${current.temp_f}°`);

    $(".high-temp").html(`H: ${forecast.forecastday[0].day.maxtemp_f}°`);
    $(".low-temp").html(`L: ${forecast.forecastday[0].day.mintemp_f}°`);

    $(".forecast-grid").html(``);
    $.each(forecast.forecastday[0].hour, (idx, hour) => {
      $(".forecast-grid").append(`<div class="forecast-element">
    <p class="forecast-time">${hour.time.slice(-5)}</p>
    <img class="forecast-icn" src="${hour.condition.icon}" alt="" />
    <p class="forecast-temp">${hour.temp_f}°</p>
  </div>`)
    })

    $.each(forecast.forecastday, (idx, day) => {
      if (idx == 0) {
        $(".day-forecast").append(`<div class="day-forecast-row">
                <p class="day-forecast-date">Today</p>
                <img src="${day.day.condition.icon}" alt="" />
                <div class="day-forecast-highlow">
                  <p>L: ${day.day.mintemp_f}°</p>
                  <p>H: ${day.day.maxtemp_f}°</p>
                </div>
              </div>`)
      } else {
        $(".day-forecast").append(`<div class="day-forecast-row">
                <p class="day-forecast-date">${day.date}</p>
                <img src="${day.day.condition.icon}" alt="" />
                <div class="day-forecast-highlow">
                  <p>L: ${day.day.mintemp_f}°</p>
                  <p>H: ${day.day.maxtemp_f}°</p>
                </div>
              </div>`)
      }
    })
    $(".wind-speed").html(`Speed: ${current.wind_mph}mph`);
    $(".precip").html(`Precipitation: ${current.precip_in}"`);

    $(".feels-like").html(`Feels Like: ${current.feelslike_f}°`);

    $(".visibility").html(`Visibility: ${current.vis_miles}mi`);
  }

}

function weatherSetup(data) {
  loc = data.location;
  current = data.current;
  forecast = data.forecast;

  updateView();
}

function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let city = $("#city").val();
    let zip = $("#zip").val();
    let days = $("#days").val();

    measurement = $('input[name="is_metric"]:checked').val();

    if (city != "") {
      let cityURL = baseUrl + key + "&q=" + city + "&days=" + days + "&aqi=no&alerts=no";
      $.getJSON(cityURL, (data) => {
        weatherSetup(data);
      }).fail(function (e) {
        console.log("error");
      })
    }

    if (zip != "") {
      let zipURL = baseUrl + key + "&q=" + zip + "&days=" + days + "&aqi=no&alerts=no";
      $.getJSON(zipURL, (data) => {
        weatherSetup(data);
      }).fail(function (e) {
        console.log("error");
      })
    }
  })
}

$(document).ready(function () {
  initListeners();
});