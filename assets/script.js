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
    for (var i = 0; i < citySearches.length; i++) {

        let liEl = document.createElement("li");
        liEl.textContent = citySearches[i];
        cityListEl.appendChild(liEl);


    }


}


displayCity();

//call the displayCity function when button is clicked
searchButtonEl.addEventListener("click", displayCity);


let appID = "d1dfd9b71c61f4f9b6151a02ee936efa"

function getWeather() {
    // Use `.value` to capture the value of the input and store it in the variable
    var searchCity = document.querySelector('#city-input').value;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?&appid=${appID}&q=${searchCity}` + '&units=imperial'

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
            document.querySelector("#wind-speed").textContent = " " + data.wind.speed + " mph";
            document.querySelector("#humidity").textContent = " " + data.main.humidity + "%";
            document.querySelector("#temperature").textContent = " " + data.main.temp + " º F";
            let lat = data.coord.lat;
            let long = data.coord.lon;
            let cityID = data.id;
            // `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${appID}`


            //UV API Call
            fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${appID}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvdata) {
                    console.log(uvdata);
                    //add uvindex from second call
                    document.querySelector("#uv-index").textContent = " " + uvdata.value;
                });
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${appID}&units=imperial`)
            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
            .then(function(response){
                return response.json();
            })
            .then(function(fdata){
                console.log(fdata)
                for(var i=0;i<5;i++){
                document.querySelector("#daytemp"+(i+1)).textContent = " "+fdata.daily[i].temp.day+" º F"
                document.querySelector("#dayhumidity"+(i+1)).textContent = " "+fdata.daily[i].humidity+" º F"
            }
                // document.querySelector("#day2temp").textContent = " "+fdata.daily[1].temp.day+" º F"
                // document.querySelector("#day2humidity").textContent = " "+fdata.daily[1].humidity+" º F"
            })




        });

}






