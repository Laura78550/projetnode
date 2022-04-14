const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//const apiUrl = "https://api.lyrics.ovh/v1/";
const lyricsRoutes = require('./handlers/lyrics.js');
const authRoutes = require('./handlers/auth.js');
const { axios } = require('./helpers/fetch.js');
const createError = require('http-errors');

// Import libs
app.use(bodyParser.json());

app.use('/lyrics', lyricsRoutes);
app.use('/login', authRoutes);

app.get('/',async(req,res)=>{

  const {response, error} = await axios({
    method: "GET",
    url: 'https://api.lyrics.ovh/v1/Coldplay/Adventufgbgre of a Lifetime'
  });

  // Handle error case
  if(response) {
    const searchRegExp = /\n/g;
    const lyrics = response.data.lyrics.replace(searchRegExp, '<br />');
    res.send(lyrics)
  }else{
    res.status(404).json(createError.NotFound())
  }

});

// Run app
app.listen(port,()=>{
  console.log(`Exemple app listening at http://localhost:${port}`);
})
