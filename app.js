const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});


app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  res.send(`Thanks ${firstName}!`);
})


app.listen(port, () => {
  console.log(`Newsletter-Signup is listening on port ${port}.`);
});