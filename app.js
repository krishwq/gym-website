const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;
const ConnectToMongo=require('./db');
const user = require('./modules');

ConnectToMongo(); // Connect to MongoDB

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); //for parse data
app.use(
session({
    secret: "Krishnendu",
    resave: false,
    saveUninitialized: true,
})
); //for session

// Serve static files
app.use("/static", express.static("statics"));

//PUG
app.set("view engine", "pug"); //set the pug
app.set("views", path.join(__dirname, "views")); //set views directory

// Routes for form
app.get("/", (req, res) => {
if (req.session.loggedIn) {
    res.render("thankyou.pug", { user: req.session.user });
} else {
    res.status(200).render("index.pug");
}
});

//for login and save data
app.post("/submit",async (req, res) => {
const {name,mobile}=req.body;

let existuser=await user.findOne({mobile});
if(existuser){
    res.status(200).render("index.pug", { alert: "User already exists" });
    return;
}

const data=user(req.body);
data.save();

if (name) {
    req.session.loggedIn = true;
    req.session.username = name;
    res.redirect("/");
} else {
    res.status(200).render("index.pug");
}
});

//submit anther response
app.get("/another_response", (req, res) => {
req.session.destroy(() => {
res.redirect("/");
});
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
