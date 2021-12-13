//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
//dung de public file css de khi chay localhost hien thi file css

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const eMail = req.body.email;

    var data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/f0dca0d863";
    const options = {
        method: "POST",
        auth: "phvietanh1998:4a1b053960ad211f538dc663bfdb6bdf-us1"
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (_req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});

//API KEYS
//4a1b053960ad211f538dc663bfdb6bdf-us1

//List ID
//f0dca0d863