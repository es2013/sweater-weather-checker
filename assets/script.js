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
        //limit the list of cities to 10
        citySearches = citySearches.slice(0, 10);
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
            //handle error for invalid city inputs
            if (data.cod == 404) {
                alert("Sweater weather can't find this city. Try a different city.");
                return;
             }


            let currentWeather = document.querySelector("#current-city");
            document.querySelector("#current-city").textContent = data.name;

            //update content for other html fields using ID and textContent to replace values
            document.querySelector("#wind-speed").textContent = " " + data.wind.speed + " mph";
            document.querySelector("#humidity").textContent = " " + data.main.humidity + "%";
            document.querySelector("#temperature").textContent = " " + data.main.temp + " º F";
            let lat = data.coord.lat;
            let long = data.coord.lon;
            let cityID = data.id;


            //UV API Call
            fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${appID}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvdata) {
                    console.log(uvdata);
                    //add uvindex from second call
                    document.querySelector("#uv-index").textContent = " " + uvdata.value;
                    
                })
                .catch(function() {
                    alert("The city you entered is invalid")});
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${appID}&units=imperial`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (fdata) {
                    console.log(fdata)
                    //0 index from API is todays date. starting at 1 for forecast

                    for (var i = 1; i < 6; i++) {
                        dateString = moment.unix(fdata.daily[i].dt).format('L')
                        document.querySelector("#day" + i).textContent = dateString

                        document.querySelector("#daytemp" + i).textContent = " " + fdata.daily[i].temp.day + " º F"
                        $("#icon" + i).attr("src", `http://openweathermap.org/img/wn/${fdata.daily[i].weather[0].icon}@2x.png`)
                        document.querySelector("#dayhumidity" + i).textContent = " " + fdata.daily[i].humidity + " %"
                    }

                })




        });

}






