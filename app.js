const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const https = require("https");


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const apiKey = process.env.apiKey;
const server = process.env.server;
const listID = process.env.listID;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});


app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listID}`;

  const options = {
    method: "POST",
    auth: `callmesam808:${apiKey}`
  }

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })
  
  request.write(jsonData);
  request.end();

});


app.post("/failure", (req, res) => {
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Newsletter-Signup is listening on port ${port}.`);
});
