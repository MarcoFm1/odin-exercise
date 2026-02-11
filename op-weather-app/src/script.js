import "./style.css"
const btnSearch = document.getElementById("btn-search");
const btnLocation = document.getElementById("btn-location");
const input = document.getElementById("input-text");

const content = document.getElementById("id-content");
const cityContent = document.getElementById("city-content");
const weatherIcon = document.getElementById("weather-icon");
const extraInfo = document.getElementById("extra-info");
const forecastDiv = document.getElementById("forecast");


function fetchWeather(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LT7F3VN9WZJJRWVQPUFECFPMU&contentType=json`)
        .then(res => res.json())
        .then(response => {
            content.innerHTML = `${response.currentConditions.temp} °C`;
            cityContent.innerHTML = response.resolvedAddress;

            const humidity = response.currentConditions.humidity;
            const windSpeed = response.currentConditions.windspeed;
            const card = document.getElementById("weather-card");


            if (humidity > 70) {
                let cant = humidity / 2
                createRainDrops(cant);
            }
            if (windSpeed > 60) {
                card.classList.add("wind");
            } else {
                stopWind();
            }


            const condition = response.currentConditions.conditions.toLowerCase();
            if (condition.includes("cloud")) {
                weatherIcon.textContent = "☁️"
                content.style.color = "white"
            }
            else if (condition.includes("rain")) {
                weatherIcon.textContent = "🌧"
                content.style.color = "grey"
                console.log(humidity)
            }
            else if (condition.includes("snow")) {
                weatherIcon.textContent = "❄️"
                content.style.color = "lightblue"
            }
            else if (condition.includes("clear")) {
                weatherIcon.textContent = "☀️"
                content.style.color = "orange"
            }
            else weatherIcon.innerHTML = `<p style="color: white">🌤</p>`;

            extraInfo.innerHTML = `
            <p style="color: lightblue">💧 Humidity: ${response.currentConditions.humidity}%</p>
            <p style="color: aliceblue">💨 Wind: ${response.currentConditions.windspeed} km/h </p>`;

            forecastDiv.innerHTML = "";
            response.days.slice(0, 6).forEach(day => {
                const date = new Date(day.datetime);

                const dayName = date.toLocaleDateString("en-EN", {
                    weekday: "long"
                });

                forecastDiv.innerHTML += `
                <div class="bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl">
                    <p class="font-semibold capitalize" style="color:violet">${dayName}</p>
                    <p>${day.temp}°C</p>
                    <p class="text-xs">${day.conditions}</p>
                </div>`;
            });

            const body = document.body;
            if (condition.includes("clear")) {
                body.className = "bg-gradient-to-br from-yellow-300 to-orange-500 min-h-screen flex items-center justify-center transition-all duration-500";
            } else if (condition.includes("rain")) {
                body.className = "bg-gradient-to-br from-gray-600 to-blue-900 min-h-screen flex items-center justify-center transition-all duration-500";
            } else {
                body.className = "bg-gradient-to-br from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center transition-all duration-500";
            }

        })
        .catch(() => {
            content.innerHTML = "City not found";
        });
}

btnSearch.addEventListener("click", () => {
    fetchWeather(input.value.trim());
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click()
    };
});


btnLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(position => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setTimeout(() => cityContent.innerHTML = "Your current location", 3000)
        fetchWeather(coords);
    });

});

function createRainDrops(cant) {
    for (let i = 0; i < cant; i++) {
        const drop = document.createElement("div");
        drop.classList.add("rain-drop");
        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.animationDuration = (0.5 + Math.random()) + "s";
        document.body.appendChild(drop);
    }
}

function stopWind() {
    document.getElementById("weather-card").classList.remove("wind");
}
