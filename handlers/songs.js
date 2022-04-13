const express = require('express');
const router = express.Router();
const { SongsValidation } = require("../middlewares/validators");
const auth = require("../middlewares/auth");
const { axios } = require('../helpers/fetch.js');

router.get(
  '/',
  SongsValidation.responseSongs,
  async function getSongs(req,res){
    //res.json({message : "All songs" });
    let author = req.query.author;
    let title = req.query.title;
    
  const {response, error} = await axios({
    method: "GET",
    url: 'https://api.lyrics.ovh/v1/'+author+'/'+ title
  });

  // Handle error case
  if(response) {
    // const searchRegExp = /\n/g;
    // const lyrics = response.data.lyrics.replace(searchRegExp, '');
    res.send(response.data.lyrics)
  }else{
    res.status(404).json(createError.NotFound())
  }

  },
);

router.get(
  '/:id',
  auth,
  SongsValidation.getSongsWithId,
  SongsValidation.responseSongs,
  async function getSong(req,res){
    res.json({message : `Song id ${req.params.id}` });
  },
);

router.post(
  '/',
  SongsValidation.responseSongs,
  async function createSong(req,res){
    res.json({message : "Create song" });
  }
);

router.delete(
  '/:id',
  SongsValidation.deleteSongsWithId,
  SongsValidation.responseSongs,
  async function deleteSong(req,res){
    res.json({message : `Delete song id ${req.params.id}` });
  }
);


module.exports = router;
