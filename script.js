let data = {};
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");

const div = document.createElement("div");
const resolvedAddressEle = document.createElement("h4");
const descriptionEle = document.createElement("h4");
const temperatureEle = document.createElement("h4");
const conditionEle = document.createElement("h4");
const preciprobEle = document.createElement("h4");

function fahrenheitToCelsius(fahrenheit) {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value;

  try {
    async function getWeather() {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        searchTerm
      )}?key=82R6JYDR48CRZTRJUGTWTBFDC`;

      const response = await fetch(url);

      const jsonData = await response.json();

      if (jsonData.resolvedAddress.length > 0) {
        resolvedAddressEle.innerHTML = jsonData.resolvedAddress;
        descriptionEle.innerHTML = jsonData.description;
        temperatureEle.innerHTML =
          fahrenheitToCelsius(jsonData.currentConditions.temp) + " °C";
        conditionEle.innerHTML = jsonData.currentConditions.conditions;
        preciprobEle.innerHTML = jsonData.currentConditions.precipprob;

        div.appendChild(resolvedAddressEle);
        div.appendChild(descriptionEle);
        div.appendChild(temperatureEle);
        div.appendChild(conditionEle);
        div.appendChild(preciprobEle);

        container.appendChild(div);
      } else {
        alert("No data found");
      }
    }

    getWeather();
  } catch (error) {
    alert("No data found" + error);
  }
});
