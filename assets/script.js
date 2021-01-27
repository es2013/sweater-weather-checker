let cityInput = document.querySelector("#city-input");
let cityText = document.querySelector(".city-text");
let searchButton = document.querySelector("button");



//get value from localStorage
let storedInput = localStorage.getItem('cityInput');

//display cityInput if not null
if(cityInput){
    cityText.textContent = storedInput;
    console.log(storedInput);
}

// add event listener that listens for cityInput
cityInput.addEventListener("input",function(city){
    cityText.textContent = city.target.value;

});

//create a function that saves the city everytime i click on button
let displayCity = function(){
    // let cityList = JSON.parse(localStorage.getItem('cityInput')) || [];
    localStorage.setItem('cityInput', cityText.textContent)
}

//call the displayCity function when button is clicked
searchButton.addEventListener("click", displayCity);




//my apikey for openweather "d1dfd9b71c61f4f9b6151a02ee936efa"

function getWeather() {
    // Use `.value` to capture the value of the input and store it in the variable
    var searchCity = document.querySelector('#city-input').value;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?&appid=d1dfd9b71c61f4f9b6151a02ee936efa&q=${searchCity}`+'&units=imperial'
        
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // console.log(searchCity);

            let currentWeather = document.querySelector("#current-city");
            let cityTitle = document.createElement('h3');

            
            //get name of city input into current weather section
            cityTitle.textContent = data.name;
            currentWeather.appendChild(cityTitle);
            
            




        });
}





