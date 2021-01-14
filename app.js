const express =  require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.get("/getWeather", (req, res) => {
    var city = req.query.city;

    axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
            key: '23d7b2ccbc79402f926132757210401',
            q: city
        }
    })
    .then(response => {
        // console.log(response.data);
        res.send({
            city: response.data.location.name,
            temperature: response.data.current.temp_c,
            weather: response.data.current.condition.text,
            weatherImage: response.data.current.condition.icon
        }); 
    })
    .catch(error =>{
        console.log(error);
    })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})