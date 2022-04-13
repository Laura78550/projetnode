const express = require('express');
const router = express.Router();

router.get(
  '',
  async function getSongs(req,res){
    res.json({message : "All songs" });
  }
);

router.get(
  '/:id',
  async function getSong(req,res){
    res.json({message : `Song id ${req.params.id}` });
  }
);

router.post(
  '',
  async function createSong(req,res){
    res.json({message : "Create song" });
  }
);

router.delete(
  '/:id',
  async function deleteSong(req,res){
    res.json({message : `Delete song id ${req.params.id}` });
  }
);


module.exports = router;
