const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.get('/', (req, res) => {

});

app.listen(port, () => {
  console.log(`Newsletter-Signup is listening on port ${port}.`);
});