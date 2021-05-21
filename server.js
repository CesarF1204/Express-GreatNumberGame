let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
//body parser
app.use(bodyParser.urlencoded({extended: true}));
//session
app.use(session({secret: "Shh, its a secret!"}));

//static
app.use(express.static(__dirname + '/static'));
//css
app.use(express.static(__dirname + '/css'));
//ejs
app.set('view engine', 'ejs');

let random_number = Math.floor(Math.random() * 100) + 1;
let guessNumber = {};
//routes
//render index
app.get("/", function(request, response) {
    response.render("index", {randomNumber: request.session.randomNumber, guessNumber: guessNumber['guess_number']});
});
//handles the processing of the submitted form and assigning some random number to session
app.post("/process", function(request, response) {
    request.session.randomNumber = random_number;
    guessNumber['guess_number'] = request.body['guess_number'];
    //log values to terminal
    console.log(request.session);
    console.log("Answer: "+ request.session.randomNumber);
    console.log("Guess Number: "+ guessNumber['guess_number']);
    console.log("================================");
    response.redirect("/");
});
//handles the reset button
app.post('/reset', function(request, response) {
    if(request.body['action'] == 'playagain') {
        request.session.destroy();
        //log session destroy to terminal
        console.log("Play again was clicked! Session was deleted. \nSession Value:", request.session);
        console.log("================================");
        //assign random number again
        random_number = Math.floor(Math.random() * 100);
    }
    response.redirect("/");
});

//port
app.listen(8000, function() {
    console.log("Listening to 8000");
});