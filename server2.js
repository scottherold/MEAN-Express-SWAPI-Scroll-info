// <--- Modules --->
const express = require('express'); // imports express module
const axios = require('axios'); // import axios module for CORS

// <--- Constructors --->
const app = express();

// <--- Settings --->
app.set('view engine', 'ejs'); // sets the templating to ejs
app.set('views', __dirname + '/views'); // points to views folder
app.use(express.static(__dirname + '/static')); // points to static folder

// <--- Routing --->
// GET routes
// root
app.get('/', (req, res) => {
    res.render('index');
})

// ** people **
// default
app.get('/people', (req, res) => {
    var getAllPeople = (url, people) => {  
        axios.get(url) // API call to URL provided
        //promise if call works
        .then(response => { // use ressponse as the information received from the API server
            // creates a local variable to return the AJAX method in JSON
            const allPeople = people.concat(response.data.results);

            // boolean to check and see if the current 'next' attribute is not null
            // if not null, use recursion to call the function again within itself,
            // else, return the completed allPeople variable to the AJAX call method
            if (response.data.next !== null) {
                getAllPeople(response.data.next, allPeople);
            } else {
                console.log(allPeople);
                res.json(allPeople);
            }
        })
        // promise if call fails
        .catch(error => {
            console.log(error); // error logging
            res.json(error); // send JSON data to view
        })
    }

    // Initial function call to begin recursion process
    getAllPeople('http://swapi.co/api/people/', []);
});

// ** planets **
// default
app.get('/planets', (req, res) => {
    // Creates recursion function with the parameters of a URL and the empty variable to be filled
    var getAllPlanets = (url, planets) => {  
        axios.get(url) // API call to URL provided
        //promise if call works
        .then(response => { // use ressponse as the information received from the API server
            // creates a local variable to return the AJAX method in JSON
            const allPlanets = planets.concat(response.data.results);

            // boolean to check and see if the current 'next' attribute is not null
            // if not null, use recursion to call the function again within itself,
            // else, return the completed allPlanets variable to the AJAX call method
            if (response.data.next !== null) {
                getAllPlanets(response.data.next, allPlanets);
            } else {
                console.log(allPlanets);
                res.json(allPlanets);
            }
        })
        // promise if call fails
        .catch(error => {
            console.log(error); // error logging
            res.json(error); // send JSON data to view
        })
    }

    // Initial function call to begin recursion process
    getAllPlanets('http://swapi.co/api/planets/', []);
})

// <--- Port Listening --->
app.listen(8000, () => console.log("listening on port 8000"));