const btnSearch = document.getElementById("btn-search");
const input = document.querySelector("input");

const content = document.getElementById("id-content");
const cityContent = document.getElementById("city-content");

btnSearch.addEventListener("click", () => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value.trim()}?unitGroup=metric&key=LT7F3VN9WZJJRWVQPUFECFPMU&contentType=json`).then(
        function (response) {
            return response.json();
        }
    ).then(
        function (response) {
            content.innerHTML = `${response.currentConditions.temp} °C`
            cityContent.innerHTML = response.timezone
            console.log(input.value.trim())
        }
    ).catch(
        function (err) {
            content.innerHTML = "City not found";
            console.error(err);
        });
})