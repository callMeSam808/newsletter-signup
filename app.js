const express = require('express');
const app = express();
const port = 3000;
const https = require("https");


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const apiKey = "5f9aea9939823f77edfcdef5c63785bc-us14";
const server = "us14";
const listID = "8073f9606c"


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
      res.send("Success!");
    } else {
      res.send("Submission failed. Please try again!");
    }
    
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })
  
  request.write(jsonData);
  request.end();

});


app.listen(port, () => {
  console.log(`Newsletter-Signup is listening on port ${port}.`);
});
