//Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');                                     
app.use(bodyParser.json());   

var star_wars_array = [
    {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "https://swapi.co/api/planets/1/",
            "films": [
                        "https://swapi.co/api/films/2/",
                        "https://swapi.co/api/films/6/",
                        "https://swapi.co/api/films/3/",
                        "https://swapi.co/api/films/1/",
                        "https://swapi.co/api/films/7/"
                    ],
            "species": [
                        "https://swapi.co/api/species/1/"
                    ],
            "vehicles": [
                        "https://swapi.co/api/vehicles/14/",
                        "https://swapi.co/api/vehicles/30/"
                    ],
            "starships": [
                        "https://swapi.co/api/starships/12/",
                        "https://swapi.co/api/starships/22/"
                    ],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
            "url": "https://swapi.co/api/people/1/"
    },
    {
            "name": "Yavin IV",
            "rotation_period": "24",
            "orbital_period": "4818",
            "diameter": "10200",
            "climate": "temperate, tropical",
            "gravity": "1 standard",
            "terrain": "jungle, rainforests",
            "surface_water": "8",
            "population": "1000",
            "residents": [],
            "films": [
                        "https://swapi.co/api/films/1/"
                    ],
            "created": "2014-12-10T11:37:19.144000Z",
            "edited": "2014-12-20T20:58:18.421000Z",
            "url": "https://swapi.co/api/planets/3/"
    },
    {
            "name": "Alderaan",
            "rotation_period": "24",
            "orbital_period": "364",
            "diameter": "12500",
            "climate": "temperate",
            "gravity": "1 standard",
            "terrain": "grasslands, mountains",
            "surface_water": "40",
            "population": "2000000000",
            "residents": [
                        "https://swapi.co/api/people/5/",
                        "https://swapi.co/api/people/68/",
                        "https://swapi.co/api/people/81/"
                    ],
            "films": [
                        "https://swapi.co/api/films/6/",
                        "https://swapi.co/api/films/1/"
                    ],
            "created": "2014-12-10T11:35:48.479000Z",
            "edited": "2014-12-20T20:58:18.420000Z",
            "url": "https://swapi.co/api/planets/2/"
    },
    {
            "name": "Bespin",
            "rotation_period": "12",
            "orbital_period": "5110",
            "diameter": "118000",
            "climate": "temperate",
            "gravity": "1.5 (surface), 1 standard (Cloud City)",
            "terrain": "gas giant",
            "surface_water": "0",
            "population": "6000000",
            "residents": [
                        "https://swapi.co/api/people/26/"
                    ],
            "films": [
                        "https://swapi.co/api/films/2/"
                    ],
            "created": "2014-12-10T11:43:55.240000Z",
            "edited": "2014-12-20T20:58:18.427000Z",
            "url": "https://swapi.co/api/planets/6/"
    },
    {
            "name": "Naboo",
            "rotation_period": "26",
            "orbital_period": "312",
            "diameter": "12120",
            "climate": "temperate",
            "gravity": "1 standard",
            "terrain": "grassy hills, swamps, forests, mountains",
            "surface_water": "12",
            "population": "4500000000",
            "residents": [
                        "https://swapi.co/api/people/3/",
                        "https://swapi.co/api/people/21/",
                        "https://swapi.co/api/people/36/",
                        "https://swapi.co/api/people/37/",
                        "https://swapi.co/api/people/38/",
                        "https://swapi.co/api/people/39/",
                        "https://swapi.co/api/people/42/",
                        "https://swapi.co/api/people/60/",
                        "https://swapi.co/api/people/61/",
                        "https://swapi.co/api/people/66/",
                        "https://swapi.co/api/people/35/"
                    ],
            "films": [
                        "https://swapi.co/api/films/5/",
                        "https://swapi.co/api/films/4/",
                        "https://swapi.co/api/films/6/",
                        "https://swapi.co/api/films/3/"
                    ],
            "created": "2014-12-10T11:52:31.066000Z",
            "edited": "2014-12-20T20:58:18.430000Z",
            "url": "https://swapi.co/api/planets/8/"
    },
    {
            "name": "R5-D4",
            "height": "97",
            "mass": "32",
            "hair_color": "n/a",
            "skin_color": "white, red",
            "eye_color": "red",
            "birth_year": "unknown",
            "gender": "n/a",
            "homeworld": "https://swapi.co/api/planets/1/",
            "films": [
                        "https://swapi.co/api/films/1/"
                    ],
            "species": [
                        "https://swapi.co/api/species/2/"
                    ],
            "vehicles": [],
            "starships": [],
            "created": "2014-12-10T15:57:50.959000Z",
            "edited": "2014-12-20T21:17:50.321000Z",
            "url": "https://swapi.co/api/people/8/"
    },
    {
            "name": "Darth Vader",
            "height": "202",
            "mass": "136",
            "hair_color": "none",
            "skin_color": "white",
            "eye_color": "yellow",
            "birth_year": "41.9BBY",
            "gender": "male",
            "homeworld": "https://swapi.co/api/planets/1/",
            "films": [
                        "https://swapi.co/api/films/2/",
                        "https://swapi.co/api/films/6/",
                        "https://swapi.co/api/films/3/",
                        "https://swapi.co/api/films/1/"
                    ],
            "species": [
                        "https://swapi.co/api/species/1/"
                    ],
            "vehicles": [],
            "starships": [
                        "https://swapi.co/api/starships/13/"
                    ],
            "created": "2014-12-10T15:18:20.704000Z",
            "edited": "2014-12-20T21:17:50.313000Z",
            "url": "https://swapi.co/api/people/4/"
    },
    {
            "name": "Biggs Darklighter",
            "height": "183",
            "mass": "84",
            "hair_color": "black",
            "skin_color": "light",
            "eye_color": "brown",
            "birth_year": "24BBY",
            "gender": "male",
            "homeworld": "https://swapi.co/api/planets/1/",
            "films": [
                        "https://swapi.co/api/films/1/"
                    ],
            "species": [
                        "https://swapi.co/api/species/1/"
                    ],
            "vehicles": [],
            "starships": [
                        "https://swapi.co/api/starships/12/"
                    ],
            "created": "2014-12-10T15:59:50.509000Z",
            "edited": "2014-12-20T21:17:50.323000Z",
            "url": "https://swapi.co/api/people/9/"
    },
    {
            "name": "Star Destroyer",
            "model": "Imperial I-class Star Destroyer",
            "manufacturer": "Kuat Drive Yards",
            "cost_in_credits": "150000000",
            "length": "1,600",
            "max_atmosphering_speed": "975",
            "crew": "47060",
            "passengers": "0",
            "cargo_capacity": "36000000",
            "consumables": "2 years",
            "hyperdrive_rating": "2.0",
            "MGLT": "60",
            "starship_class": "Star Destroyer",
            "pilots": [],
            "films": [
                        "https://swapi.co/api/films/2/",
                        "https://swapi.co/api/films/3/",
                        "https://swapi.co/api/films/1/"
                    ],
            "created": "2014-12-10T15:08:19.848000Z",
            "edited": "2014-12-22T17:35:44.410941Z",
            "url": "https://swapi.co/api/starships/3/"
    }
];

app.get('/',function(req,res){
    res.send("main route");
});

app.get('/api',function(req,res){
    res.send(star_wars_array);
});

app.get('/api/:id',function(req,res){
    res.send(star_wars_array[req.params.id]);
});


//app.post     [new]
//app.post(id) [update]
//app.delete   [delete]
app.post('/api/:id',function(req,res){
    if (req.params.id<=star_wars_array.length-1) {
        var newUser = { 
            "name": req.body.name;
            "" : req.body.
        };  
        star_wars_array[req.params.id]=newUser;
        res.send(newUser);
    } else {
        res.send("Id not found");
    }
});

app.post('/api',function(req,res){
    var newUser = { 
        "name": req.body.name;
        "" : req.body.
    };  
    star_wars_array.push(newUser);
    res.send(newUser);
});

app.delete('/api/delete/:id',function(req,res){
    if (req.params.id<=star_wars_array.length-1){
        star_wars_array.splice(req.params.id, 1); 
    }   
    res.send(star_wars_array);
});

//Start the server
app.listen(3000,function(req,res){
    console.log('Express listening on port 3000');
});
