const express = require('express');
const router = express.Router();
const SongsValidation = require("../middlewares/validators");

router.get(
  '/',
  SongsValidation.responseSongs,
  async function getSongs(req,res){
    res.json({message : "All songs" });
  },
);

router.get(
  '/:id',
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
