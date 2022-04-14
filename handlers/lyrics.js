const express = require('express');
const router = express.Router();
const { SongsValidation } = require("../middlewares/validators");
const auth = require("../middlewares/auth");
const { axios } = require('../helpers/fetch.js');
const { Lyric } = require('../models');

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
    res.send(response.data.lyrics)
  }else{
    res
    .status(404)
    .json(createError.NotFound())
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
  auth,
  SongsValidation.responseSongs,
  async function createSong(req,res){
    const{songname,songauthor,songlyrics} = req.headers;
    const UserId = req.auth.id;
    const lyrics = await Lyric.create({
      songName:songname,
      songAuthor:songauthor,
      songLyrics:songlyrics,
      UserId,
    });

    if(lyrics){
      res
      .status(201)
      .json({message : "Lyric created successfull" });
    }else{
      return res
      .status(400)
      .json({
        message: 'Lyric not created',
      });
    }
  }
);

router.delete(
  '/:id',
  auth,
  SongsValidation.deleteSongsWithId,
  SongsValidation.responseSongs,
  async function deleteSong(req,res){
    const lyrics = await Lyric.destroy({
      where: { id: req.params.id },
    })

    if(lyrics){
      res
      .status(200)
      .json({message : "Lyric deleted successfull" });
    }else{
      return res
      .status(404)
      .json({
        message: 'Lyric Not Found',
      });
    }
  }
);


module.exports = router;
