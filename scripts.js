const API_KEY = env.API_KEY_OPENWEATHER;
var headwearUpdate = "";
var upperBodyUpdate = "";
var lowerBodyUpdate = "";
var shoesUpdate = "";
var temp, humidity, cloudinessPercent, weather, weatherMain, windSpeed;
var weights = {
    beanie: 0,
    hat: 0,
    sunglasses: 0,
    shirt: 0,
    jacket: 0,
    heavyJacket: 0,
    pants: 0,
    shorts: 0,
    sandals: 0,
    shoes: 0
};

async function action(data){
    //console.log(data);
    temp = KtoF(data.main.feels_like);
    humidity = data.main.humidity;
    cloudinessPercent = data.clouds.all;
    weather = "no data";
    weatherMain = data.weather[0].description;
    windSpeed = MStoMPH(data.wind.speed);
    var x = data.weather[0].id;
    console.log("x is: ",x);
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
            imgElt.src = '/images/beanieTransparent.png';
            imgElt.alt = 'An image of a beanie';
            divPlaceholder.appendChild(imgElt);
            break;
        case "hat":
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/ballcapTransparent.png';
            imgElt.alt = 'An image of a hat';
            divPlaceholder.appendChild(imgElt);
            break;
        case "sunglasses":
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/sunglassesTransparent.png';
            imgElt.alt = 'An image of sunglasses';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("headwarePhotoContainer");
            divPlaceholder.removeChild(document.getElementById("headwareImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/simleyface.png';
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
            imgElt.src = '/images/tshirtTransparent.png';
            imgElt.alt = 'An image of a T-shirt';
            divPlaceholder.appendChild(imgElt);
            break;
        case "jacket":
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/jacketTransparent.png';
            imgElt.alt = 'An image of a jacket';
            divPlaceholder.appendChild(imgElt);
            break;
        case "heavy jacket":
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/thickjacketTransparent.png';
            imgElt.alt = 'An image of a thicker jacket';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("upperBodyPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("upperBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/jacketTransparent.png';
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
            imgElt.src = '/images/shortsTransparent.png';
            imgElt.alt = 'An image of shorts';
            divPlaceholder.appendChild(imgElt);
            break;
        case "pants":
            divPlaceholder = document.getElementById("pantsPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("lowerBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/pantsTransparent.png';
            imgElt.alt = 'An image of pants';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("pantsPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("lowerBodyImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/pantsTransparent.png';
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
            imgElt.src = '/images/shoesTransparent.png';
            imgElt.alt = 'An image of a shoe';
            divPlaceholder.appendChild(imgElt);
            break;
        case "sandals":
            divPlaceholder = document.getElementById("shoesPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("shoesImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/sandalsTransparent.png';
            imgElt.alt = 'An image of sandals';
            divPlaceholder.appendChild(imgElt);
            break;
        default:
            divPlaceholder = document.getElementById("shoesPhotoContainer");
            divPlaceholder.removeChild(document.getElementById("shoesImg"));
            imgElt = document.createElement('img');
            imgElt.src = '/images/shoesTransparent.png';
            imgElt.alt = 'An image of a shoe';
            divPlaceholder.appendChild(imgElt);
            lowerBodyUpdate = lowerBodyUpdate + "Shoes and sandals were closely weighted. Pick your favorite! ";
            break;
    }

    document.getElementById("headwearText").textContent = headwearUpdate;
    document.getElementById("upperBodyText").textContent = upperBodyUpdate;
    document.getElementById("lowerBodyText").textContent = lowerBodyUpdate;
    document.getElementById("shoesText").textContent = shoesUpdate;
}

function getWinners(){
    var headWin, upperWin, lowerWin, footWin;

    if(weights.beanie > weights.hat && weights.beanie > weights.sunglasses){
        headWin = "beanie";
    } else if(weights.hat > weights.beanie && weights.hat > weights.sunglasses){
        headWin = "hat";
    } else if(weights.sunglasses > weights.beanie && weights.sunglasses > weights.hat){
        headWin = "sunglasses";
    } else{
        headWin = "none";
    }

    if(weights.shirt > weights.jacket && weights.shirt > weights.heavyJacket){
        upperWin = "shirt";
    } else if(weights.jacket > weights.shirt && weights.jacket > weights.heavyJacket){
        upperWin = "jacket";
    } else if(weights.heavyJacket > weights.shirt && weights.heavyJacket > weights.jacket){
        upperWin = "heavy jacket";
    } else{
        upperWin = "none"; //recommend light jacket since it's suited for most situations
    }

    if(Math.abs(weights.shorts - weights.pants) < 0.5){
        lowerWin = "close"; //recommend pants because better dressed 
    }else if(weights.shorts > weights.pants){
        lowerWin = "shorts";
    } else{
        lowerWin = "pants";
    }

    if(Math.abs(weights.shoes - weights.sandals) < 0.5){
        footWin = "close"; //recommend shoes because more commonly worn 
    }else if(weights.shoes > weights.sandals){
        footWin = "shoes";
    } else{
        footWin = "sandals";
    }

    return {
        hw: headWin,
        uw: upperWin,
        lw: lowerWin,
        fw: footWin
    };
}

function assignWind(){
    if( windSpeed < 1){
        headwearUpdate = headwearUpdate + "It's not windy, so headwear and accessories won't be bothered. ";
    } else if(windSpeed < 7){
        headwearUpdate = headwearUpdate + "There's some light wind out there, and a hat or accesory might be affected by it. ";
        weights.hat-=0.5;
    }else if(windSpeed < 15){
        headwearUpdate = headwearUpdate + "There's some notable wind, so a wearing hat or accesory might be cumbersome. ";
        weights.hat-=1.3;
    }else{
        headwearUpdate = headwearUpdate + "There's some strong wind out, so a hat or head/face accesory is a bad idea. ";
        weights.hat-=2;
    } 
}

function assignTemp(){
    console.log("temp is "+temp);
    if(temp < 40){
        upperBodyUpdate = upperBodyUpdate + "It's going to be quite cold, so a heavier jacket is a good idea. ";
        weights.heavyJacket+=2;
        weights.shirt-=1;
        lowerBodyUpdate = lowerBodyUpdate + "Since it's going to be quite cold, you'll want pants instead of shorts. ";
        weights.pants+=2;
        headwearUpdate = headwearUpdate + "You'll want to keep your head warm in the cold. Bonus points for a hat or beanie. ";
        weights.beanie+=2;
        weights.hat+=1;
        shoesUpdate = shoesUpdate + "You'll want to keep the dogs inside today. Bring some shoes to keep your feet warm. ";
        weights.shoes+=2;
    } else if(temp < 63){
        upperBodyUpdate = upperBodyUpdate + "It's going to be a bit chilly, so a lighter jacket is a good idea. ";
        weights.jacket+=2;
        weights.shirt-=0.5;
        lowerBodyUpdate = lowerBodyUpdate + "Since it's going to be chilly, you'll want pants instead of shorts. ";
        weights.pants+=2;
        headwearUpdate = headwearUpdate + "Since it's going to be a bit chilly, consider a beanie or hat. ";
        weights.beanie+=0.6;
        weights.hat+=0.5;
        shoesUpdate = shoesUpdate + "Since it's going to be a bit chilly, you might want to wear shoes instead of sandals. ";
        weights.shoes+=1.5;
    }else if(temp < 75){
        upperBodyUpdate = upperBodyUpdate + "It's going to be temperate, so a plain old shirt will be fine. ";
        weights.shirt+=2;
        weights.heavyJacket-=1;
        lowerBodyUpdate = lowerBodyUpdate + "Since it's going to be temperate, you should be comfortable in either pants or shorts. ";
        weights.pants+=1.1;
        weights.shorts+=1;
        shoesUpdate = shoesUpdate + "A nice moderate temperature means you should be comfortable in either shoes or sandals. ";
        weights.shoes+=1.1;
        weights.sandals+=1;
    }else if(temp < 84){
        headwearUpdate = headwearUpdate + "It's warm out, so no need for a beanie or warming headwear. ";
        weights.beanie-=1;
        upperBodyUpdate = upperBodyUpdate + "It's going to be pretty warm, so a plain old shirt will be fine. ";
        weights.shirt+=2;
        weights.jacket-=0.8;
        weights.heavyJacket-=1.4;
        lowerBodyUpdate = lowerBodyUpdate + "Since it's going to be warm, shorts are a good idea. ";
        weights.shorts+=1.5;
        shoesUpdate = shoesUpdate + "Since it's a bit warm today, you could rock some sandals. Or just stick with your favorite pair of shoes. ";
        weights.sandals+=1.2;
        weights.shoes+=0.9;
    }else{
        headwearUpdate = headwearUpdate + "It's a hot one, so no need for a beanie or warming headwear. ";
        weights.beanie-=2;
        upperBodyUpdate = upperBodyUpdate + "It's going to be hot, so a plain old shirt will be fine. You might want a looser fitting shirt to help you stay cool. ";
        weights.shirt+=2;
        weights.jacket-=1.6;
        weights.heavyJacket-=2;
        lowerBodyUpdate = lowerBodyUpdate + "Since it's going to be hot, you'll be most comfortable in shorts. ";
        weights.shorts+=2;
        shoesUpdate = shoesUpdate + "Since it's hot out, sandals would be a great way to release some heat. ";
        weights.sandals+=1.5;
    }
}

function assignWeather(){
    console.log("Weather is: ",weather);
    switch (weather){
        case "clear":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". You might want to bring some sunglasses. ";
            weights.sunglasses += 1;
            break;
        case "thunderstorm":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". Consider a hat to keep rain off of your face. ";
            weights.hat+=1;
            break;
        case "drizzle":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". Consider bringing a hat if you want to keep your head dry. ";
            weights.hat+=0.5;
            break;
        case "rain":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". Consider wearing a hat to keep the rain off of your face. ";
            weights.hat+=1;
            break;
        case "snow":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". Consider wearing a beanie to keep your head warm. ";
            weights.hat+=1;
            break;
        case "particles":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". Consider wearing something to protect your eyes from particles. ";
            weights.sunglasses+=0.5;
            break;
        case "cloudy":
            headwearUpdate = headwearUpdate+"It's looking like "+weatherMain+". ";
            break;
        default: 
        }
}

function KtoF(temp){
    return (((temp-273.15)/0.5556)+32).toFixed(1);
}

function MStoMPH(speed){
    return (speed*2.23694).toFixed(1);
}

function getLL(input){
    numericRegex = /^[0-9]+$/;
    if(input.toString().length != 5 || !numericRegex.test(input)){
        alert("United States ZIP codes need to be 5 digit numbers!");
        return 0;
    }

    const apiUrl = "http://api.openweathermap.org/geo/1.0/zip?zip="+input+",US&appid=8abcdb792c6787529d9fd69825dd5c7a";
    /*return metadata:
    {
        "zip": "90210",
        "name": "Beverly Hills",
        "lat": 34.0901,
        "lon": -118.4065,
        "country": "US"
    }*/
    
    console.log(apiUrl);

    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Geocoding call response: ", data);

        if ('lat' in data && 'lon' in data) {
            console.log("Latitudinal and longitudinal data found in response");
            const latitude = data.lat;
            const longitude = data.lon;

            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
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
        console.log("LL is ", LL);
        var latitude = LL.lat;
        var longitude = LL.lon;
        const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY;
    
        fetch(apiUrl).then(response => { 
            console.log(response); 
            if(!response.ok){
                alert("Error: API response was not 'ok'.");
                return;
            }else{
                return response.json();
            }
        }).then(data => { 
            console.log("Weather data response: ", data);
            action(data.list[0]);
        });
    } catch(error){
        console.log("Error in receive().")
    }
}