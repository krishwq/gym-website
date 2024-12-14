const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

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
app.post("/login", (req, res) => {
const { name, age, gender, address, more } = req.body;
let dataTOSAVE = `Name of the client is ${name},age:${age},gender : ${gender}, residing at ${address}.More about him/her : ${more} \n`;
  // Save form data to a file
fs.appendFile("form-data.txt", dataTOSAVE, (err) => {
    if (err) {
    console.error("Error saving data:", err);
    return res.status(500).send("Internal Server Error");
    }
});
if (name) {
    req.session.loggedIn = true;
    req.session.username = name;
    res.redirect("/");
} else {
    res.status(200).render("index.pug");
}
});

//logout
app.get("/logout", (req, res) => {
req.session.destroy(() => {
    res.redirect("/");
});
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
