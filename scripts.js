

async function action(data){
    //console.log(data);
    temp = KtoF(data.list[0].main.feels_like);
    SunIsUp = checkSunset(data.city.sunrise, data.city.sunset);
    humidity = data.list[0].main.humidity;
    cloudinessPercent = data.list[0].clouds.all;
    weather = "no data";
    weatherMain = data.list[0].weather[0].description;
    windSpeed = MStoMPH(data.list[0].wind.speed);
    var x = data.list[0].weather[0].id;
    switch(true){ //init weather variable
        case x < 300:
            weather = "thunderstorm";
            break;
        case x < 400:
            weather = "drizzle";
            break;
        case x < 600:
            weather = "rain";
            break;
        case x < 700:
            weather = "snow";
            break;
        case x < 800:
            weather = "particles";
            break;
        case x == 800:
            weather = "clear";
            break;
        case x > 800:
            weather = "cloudy";
            break;
        default:
            weather = "unidentified weather code";
    }
    assignWeather();
    assignTemp();
    assignWind();
    assignDaylight(); 
    updatePage();
}

async function updatePage(){
    document.getElementById("hideDiv").classList.remove("hidden");
    document.getElementById("temperatureli").textContent = "Temperature: "+temp+" F";
    document.getElementById("conditionli").textContent = "Conditions: "+weatherMain;
    document.getElementById("humidityli").textContent = "Humidity: "+humidity+"%";
    document.getElementById("windli").textContent = "Wind Speed: "+windSpeed+" mph";

    var divPlaceholder;
    var imgElt;
    var winners = getWinners();
    var h = winners.hw;
    switch (h){
        case "beanie":
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/beanieTransparent.png';
            imgElt.alt = 'An image of a beanie';
            divPlaceholder.appendChild(imgElt);
            break;
        case "hat":
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/ballcapTransparent.png';
            imgElt.alt = 'An image of a hat';
            divPlaceholder.appendChild(imgElt);
            break;
        case "sunglasses":
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/sunglassesTransparent.png';
            imgElt.alt = 'An image of sunglasses';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/smileyface.png';
            imgElt.alt = 'An image of a smiley face';
            divPlaceholder.appendChild(imgElt);
            headwearUpdate = headwearUpdate + "Hats, beanies, and sunglasses are evenly weighted. Pick your favorite! ";
    }

    var u = winners.uw;
    switch(u){
        case "shirt":
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/tshirtTransparent.png';
            imgElt.alt = 'An image of a T-shirt';
            divPlaceholder.appendChild(imgElt);
            break;
        case "jacket":
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/jacketTransparent.png';
            imgElt.alt = 'An image of a jacket';
            divPlaceholder.appendChild(imgElt);
            break;
        case "heavy jacket":
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/thickjacketTransparent.png';
            imgElt.alt = 'An image of a thicker jacket';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/jacketTransparent.png';
            imgElt.alt = 'An image of a jacket';
            divPlaceholder.appendChild(imgElt);
            upperBodyUpdate = upperBodyUpdate + "Upper body wear weights are tied. Pick your favorite! ";
    }

    var l = winners.lw;
    switch(l){
        case "shorts":
            divPlaceholder = document.getElementById("pantsPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("lowerBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/shortsTransparent.png';
            imgElt.alt = 'An image of shorts';
            divPlaceholder.appendChild(imgElt);
            break;
        case "pants":
            divPlaceholder = document.getElementById("pantsPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("lowerBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/pantsTransparent.png';
            imgElt.alt = 'An image of pants';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("pantsPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("lowerBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/pantsTransparent.png';
            imgElt.alt = 'An image of pants';
            divPlaceholder.appendChild(imgElt);
            lowerBodyUpdate = lowerBodyUpdate + "Pants and shorts were closely weighted. Pick your favorite! ";
            break;
    }

    var f = winners.fw;
    switch(f){
        case "shoes":
            divPlaceholder = document.getElementById("shoesPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("shoesImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/shoesTransparent.png';
            imgElt.alt = 'An image of a shoe';
            divPlaceholder.appendChild(imgElt);
            break;
        case "sandals":
            divPlaceholder = document.getElementById("shoesPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("shoesImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/sandalsTransparent.png';
            imgElt.alt = 'An image of sandals';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("shoesPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("shoesImg"));
            imgElt = document.createElement('img');
            imgElt.src = 'images/shoesTransparent.png';
            imgElt.alt = 'An image of a shoe';
            divPlaceholder.appendChild(imgElt);
            shoesUpdate = shoesUpdate + "Shoes and sandals were closely weighted. Pick your favorite! ";
            break;
    }

    document.getElementById("headwearText").textContent = headwearUpdate;
    document.getElementById("upperBodyText").textContent = upperBodyUpdate;
    document.getElementById("lowerBodyText").textContent = lowerBodyUpdate;
    document.getElementById("shoesText").textContent = shoesUpdate;
}

function getLL(input){
    numericRegex = /^[0-9]+$/;
    if(input.toString().length != 5 || !numericRegex.test(input)){
        alert("United States ZIP codes need to be 5 digit numbers!");
        return 0;
    }

    const apiUrl = "https://api.openweathermap.org/geo/1.0/zip?zip="+input+",US&appid="+API_KEY;
    {/*return example:
    {
        "zip": "90210",
        "name": "Beverly Hills",
        "lat": 34.0901,
        "lon": -118.4065,
        "country": "US"
    }*/}

    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        //console.log("Geocoding call response: ", data);
        if ('lat' in data && 'lon' in data) {
            const latitude = data.lat;
            const longitude = data.lon;
            return {
                lat: latitude,
                lon: longitude
            };
            
        } else {
            console.error('Latitude or longitude not found in the response.');
        }
    })
    .catch(error => console.error('Error during fetch operation:', error));
}

async function receive(){
    var input = document.getElementById("codeInput").value;

    try {
        const LL = await getLL(input);
        var latitude = LL.lat;
        var longitude = LL.lon;
        const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY;
    
        fetch(apiUrl).then(response => { 
            if(!response.ok){
                alert("Error: API response was not 'ok'.");
                return;
            }else{
                return response.json();
            }
        }).then(data => { 
            console.log("Weather data response: ", data);
            action(data);
        });
    } catch(error){
        console.log("Error in receive().")
    }
}
