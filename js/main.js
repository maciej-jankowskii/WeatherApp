// VARIABLES

const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

// API DETAILS

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=fdf36bfe5aca3192e466025196bdf553";
const API_UNITS = "&units=metric";

const main = () => {
	const city = input.value || "Berlin";
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((response) => {
			const temp = response.data.main.temp;
			const hum = response.data.main.humidity;
			const wi = response.data.wind.speed;
			const statusId = response.data.weather[0].id;

			console.log(URL);

			input.value = "";
			warning.textContent = "";

			checkWeaterId(statusId);

			cityName.textContent = response.data.name;
			temperature.textContent = temp.toFixed() + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = response.data.weather[0].main;
			wind.textContent = wi + " m/s";
		})
		.catch(() => (warning.textContent = "Incorrect city name"));
};

main();

// HELPER METHOD

const checkWeaterId = (statusId) => {
	if (statusId >= 200 && statusId <= 232) {
		photo.setAttribute("src", "./img/thunderstorm.png");
	} else if (statusId >= 600 && statusId <= 622) {
		photo.setAttribute("src", "./img/ice.png");
	} else if (statusId >= 801 && statusId <= 804) {
		photo.setAttribute("src", "./img/cloud.png");
	} else if (statusId == 800) {
		photo.setAttribute("src", "./img/sun.png");
	} else if (statusId >= 701 && statusId <= 781) {
		photo.setAttribute("src", "./img/fog.png");
	} else if (statusId >= 500 && statusId <= 531) {
		photo.setAttribute("src", "./img/rain.png");
	} else if (statusId >= 300 && statusId <= 321) {
		photo.setAttribute("src", "./img/drizzle.png");
	}
};

const enterCheck = (e) => {
	if (e.key === "Enter") {
		main();
	}
};

// LISTENERS

input.addEventListener("keyup", enterCheck);
button.addEventListener("click", main);
