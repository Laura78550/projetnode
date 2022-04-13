'use strict';

const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */   
   
     const user = await User.findOne({
      where: { firstName: 'Laura' }
    });

     await queryInterface.bulkInsert('Lyrics', [
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        songName: 'SongName',
        songAuthor: 'Laura',
        songLyrics: 'lyrics of my music',
        userId: user.id,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
