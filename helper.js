const API_KEY = "8abcdb792c6787529d9fd69825dd5c7a";
/* 
this key is for a free, limited use account which has 
no personal or payment information attached to it.

I understand leaving sensitive data such as an API
key in client side code is bad.

However, github pages is free and does not
provide an easy workaround. So here it is.
*/

var headwearUpdate = "";
var upperBodyUpdate = "";
var lowerBodyUpdate = "";
var shoesUpdate = "";
var SunIsUp;
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

function KtoF(temp){
    return (((temp-273.15)/0.5556)+32).toFixed(1);
}

function MStoMPH(speed){
    return (speed*2.23694).toFixed(1);
}

function assignWind(){
    if( windSpeed < 1){
        headwearUpdate = headwearUpdate + "It's not windy, so headwear and accessories won't be bothered. ";
    } else if(windSpeed < 10){
        headwearUpdate = headwearUpdate + "There's some light wind out there, and a hat or accesory might be affected by it. ";
        weights.hat-=0.5;
    }else if(windSpeed < 20){
        headwearUpdate = headwearUpdate + "There's some notable wind, so a wearing hat or accesory might be cumbersome. ";
        weights.hat-=1.3;
    }else{
        headwearUpdate = headwearUpdate + "There's some strong wind out, so a hat or head/face accesory is a bad idea. ";
        weights.hat-=2;
    } 
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

function assignTemp(){
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

function assignDaylight(){
    if(!SunIsUp){
        weights.sunglasses -= 10;
        headwearUpdate = headwearUpdate + "The sun isn't up right now, so you don't need sunglasses. ";
    }
}

function checkSunset(sunriseStamp, sunsetStamp){
    var currStamp = Math.floor(Date.now() / 1000);
    if(currStamp < sunriseStamp || currStamp > sunsetStamp){
        return false;
    } else {
        return true;
    }
}