//Set up express
const express = require('express');
const app = express();
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
            "gender": "male"
    },
    {
            "name": "C-3PO",
            "height": "167",
            "mass": "75",
            "hair_color": "n/a",
            "skin_color": "gold",
            "eye_color": "yellow",
            "birth_year": "112BBY",
            "gender": "n/a"
    },
    {
            "name": "R2-D2",
            "height": "96",
            "mass": "32",
            "hair_color": "n/a",
            "skin_color": "white, blue",
            "eye_color": "red",
            "birth_year": "33BBY",
            "gender": "n/a"
    },
    {
            "name": "Darth Vader",
            "height": "202",
            "mass": "136",
            "hair_color": "none",
            "skin_color": "white",
            "eye_color": "yellow",
            "birth_year": "41.9BBY",
            "gender": "male"
    },
    {
            "name": "Leia Organa",
            "height": "150",
            "mass": "49",
            "hair_color": "brown",
            "skin_color": "light",
            "eye_color": "brown",
            "birth_year": "19BBY",
            "gender": "female"
    },
    {
            "name": "Owen Lars",
            "height": "178",
            "mass": "120",
            "hair_color": "brown, grey",
            "skin_color": "light",
            "eye_color": "blue",
            "birth_year": "52BBY",
            "gender": "male"
    }
];

app.get('/',function(req,res) {
    res.send("Hello World!");
});

app.get('/api',function(req,res) {
    res.send(star_wars_array);
});

app.get('/api/:id',function(req,res) {
    res.send(star_wars_array[req.params.id]);
});


//app.post     [new]
//app.post(id) [update]
//app.delete   [delete]
app.post('/api/:id',function(req,res) {
    if (req.params.id<=star_wars_array.length-1) {
        var newUser = { 
            "name": req.body.name,
            "height": req.body.height,
            "mass": req.body.mass,
            "hair_color": req.body.hair_color,
            "skin_color": req.body.skin_color,
            "eye_color": req.body.eye_color,
            "birth_year": req.body.birth_year,
            "gender": req.body.gender
        };  
        star_wars_array[req.params.id]=newUser;
        res.send(newUser);
    } else {
        res.send("Id not found");
    }
});

app.post('/api',function(req,res) {
     var newUser = { 
            "name": req.body.name,
            "height": req.body.height,
            "mass": req.body.mass,
            "hair_color": req.body.hair_color,
            "skin_color": req.body.skin_color,
            "eye_color": req.body.eye_color,
            "birth_year": req.body.birth_year,
            "gender": req.body.gender
    };  
    star_wars_array.push(newUser);
    res.send(newUser);
});

app.delete('/api/:id',function(req,res) {
    if (req.params.id<=star_wars_array.length-1) {
        star_wars_array.splice(req.params.id,1); 
    }   
    res.send(star_wars_array);
});

//Start the server
app.listen(3000,function(req,res) {
    console.log('Express listening on port 3000');
});
