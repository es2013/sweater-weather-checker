let cityInputEl = document.querySelector("#city-input");
let cityTextEl = document.querySelector(".city-text");
let searchButtonEl = document.querySelector("button");
let cityListEl = document.querySelector(".city-list");


// // add event listener that listens for cityInput
// cityInputEl.addEventListener("input", function (city) {
//     cityTextEl.textContent = city.target.value;

// });

//create a function that saves the city  to citySearches list everytime i click on button
let displayCity = function () {
    let citySearches = [];
    if (cityInputEl.value) {
        citySearches.push(cityInputEl.value);
    }

    let storedCity = localStorage.getItem('citylist')
    if (storedCity) {
        // parse JSON string to get list and push that list into citySearches
        citySearches = citySearches.concat(JSON.parse(storedCity));

    }
    localStorage.setItem('citylist', JSON.stringify(citySearches))


    //to cityList, append new city searched
    $(cityListEl).empty();
    
    //iterate over list of cities in citySearches
    for (var i=0; i < citySearches.length; i++){
    
        let liEl = document.createElement("li");
        liEl.textContent=citySearches[i];
        cityListEl.appendChild(liEl);
        
     
    }


}


displayCity();

//call the displayCity function when button is clicked
searchButtonEl.addEventListener("click", displayCity);


//my apikey for openweather "d1dfd9b71c61f4f9b6151a02ee936efa"

function getWeather() {
    // Use `.value` to capture the value of the input and store it in the variable
    var searchCity = document.querySelector('#city-input').value;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?&appid=d1dfd9b71c61f4f9b6151a02ee936efa&q=${searchCity}` + '&units=imperial'

    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // console.log(searchCity);
            

            let currentWeather = document.querySelector("#current-city");
            document.querySelector("#current-city").textContent = data.name;

            //update content for other html fields using ID and textContent to replace values
            document.querySelector("#wind-speed").textContent = " "+data.wind.speed;
            document.querySelector("#humidity").textContent = " "+data.main.humidity +"%";
            document.querySelector("#temperature").textContent = " "+data.main.temp + " Fº";



        });
}






