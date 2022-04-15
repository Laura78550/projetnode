const express = require('express');
const router = express.Router();
const { LyricsValidation } = require("../middlewares/validators");
const { auth , authValidUser}= require("../middlewares/auth");
const { axios } = require('../helpers/fetch.js');
const { Lyric } = require('../models');

router.get(
  '/',
  auth,
  authValidUser,
  LyricsValidation.responseLyricsAll,
  async function getSongs(req,res){
    const idUser = req.auth.id;
    const foundUserLyrics = await Lyric.findAll({
      where: { userId: idUser },
    });
    if(foundUserLyrics){
      res
      .status(200)
      .json({message:foundUserLyrics})
    }else{
      res
      .status(404)
      .json({message:"Lyrics Not Found"})
    }
  },
);

router.get(
  '/:author/:title',
  auth,
  LyricsValidation.responseLyrics,
  async function getSong(req,res){
      const author = req.params.author;
      const title = req.params.title;
      const {response, error} = await axios({
        method: "GET",
        url: 'https://api.lyrics.ovh/v1/'+author+'/'+ title
      });

      if(response) {
        res
        .status(200)
        .send({message :response.data.lyrics})
      }else{
        res
        .status(404)
        .json({message:"Lyric Not Found"}) //createError.NotFound()
      }
  },
);

router.get(
  '/:id',
  auth,
  authValidUser,
  LyricsValidation.getLyricWithId,
  //LyricsValidation.responseSongsOne, Ne fonctionne pas Retour = Object Json Je ne trouve pas avec Joi Validate
  async function getSongByUser(req,res){
    const lyrics = await Lyric.findByPk(req.params.id);
    if(lyrics) {
      res
      .status(200)
      .send({message :lyrics})
    }else{
      res
      .status(404)
      .json({message:"Lyric Not Found"}) //createError.NotFound()
    }
  },
);

router.post(
  '/',
  auth,
  LyricsValidation.responseLyrics,
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
  LyricsValidation.deleteLyricsWithId,
  LyricsValidation.responseLyrics,
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

router.put(
  '/:id',
  auth,
  authValidUser,
  LyricsValidation.responseLyrics,
  async function modifySong(req,res){
    const{songname,songauthor,songlyrics} = req.headers;
    const lyricId = req.params.id;

    const lyric = await Lyric.findByPk(req.params.id);

    if(lyric){
      if (songname != lyric.songName){
        lyric.songName = songname;
      }
      if (songauthor != lyric.songAuthor){
        lyric.songAuthor = songauthor;
      }
      if (songlyrics != lyric.songLyrics){
        lyric.songLyrics = songlyrics;
      }

      const lyrics = await Lyric.update({
        songName:lyric.songName,
        songAuthor:lyric.songAuthor,
        songLyrics:lyric.songLyrics,
      },{
        where: { id: lyricId },
      });

      if(lyrics){
        res
        .status(200)
        .json({message : "Lyric updated successfull" });
      }else{
        return res
        .status(400)
        .json({
          message: 'Lyric not updated',
        });
      }

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
