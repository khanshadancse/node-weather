const express = require('express');
const app = express();
const path = require('path');
const hbs =  require('hbs');

const location = require('./utils/location');
const weather = require('./utils/weather');

const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../public/templates/views');
const partialPath = path.join(__dirname, '../public/templates/partials');
app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views',templatePath);

hbs.registerPartials(partialPath);

app.get('', (req,res) => {
 res.render('index');
})

app.get('/weather',(req,res)=>{
    location(req.query.address, (errorLoc,responseLoc)=>{
        if(errorLoc){
            return res.send(errorLoc);
        }
    weather(responseLoc.center[0], responseLoc.center[1], (weatherError,weatherResponse) => {
        if(weatherError) {
            return res.send(weatherError);
        }

        res.send({
            weather_city:  responseLoc.place_name,
            weather_icon: weatherResponse.weather_icons[0],
            weather_desc: weatherResponse.weather_descriptions[0],
            wind_speed: weatherResponse.wind_speed,
            is_day: weatherResponse.is_day,
            wind_dir: weatherResponse.wind_dir,
            temperature: weatherResponse.temperature,
            wind_speed: weatherResponse.wind_speed
        })
    });
    })
    

})


app.listen(3999,()=>{
    console.log('working fine');
})