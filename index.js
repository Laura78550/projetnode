const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//const apiUrl = "https://api.lyrics.ovh/v1/";
const lyricsRoutes = require('./handlers/lyrics.js');
const authRoutes = require('./handlers/auth.js');
const { axios } = require('./helpers/fetch.js');

// Import libs
app.use(bodyParser.json());

app.use('/lyrics', lyricsRoutes);
app.use('/login', authRoutes);

app.get('/',async(req,res)=>{
    res
    .status(200)
    .send({message:"Bienvenu sur l'API Lyrics"})
});

// Run app
app.listen(port,()=>{
  console.log(`API listening at http://localhost:${port}`);
})
