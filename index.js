const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//const apiUrl = "https://api.lyrics.ovh/v1/";
var request = require('request');
const songsRoutes = require('./handlers/songs.js');
const { axios } = require('./schemas/helpers/fetch.js');

// Import libs
app.use(bodyParser.json());

app.use('/songs', songsRoutes);

app.get('/',async(req,res)=>{

  const {response, error} = await axios({
    method: "GET",
    url: 'https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime'
  });

  // Handle error case

  const searchRegExp = /\n/g;
  const lyrics = response.data.lyrics.replace(searchRegExp, '<br />');
  res.send(lyrics)
});



// Run app
app.listen(port,()=>{
  console.log(`Exemple app listening at http://localhost:${port}`);
})
