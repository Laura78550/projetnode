'use strict';
const { Role } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

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

    const user = await Role.findOne({
      where: { name: 'user' }
    });
    const guest = await Role.findOne({
      where: { name: 'guest' }
    });

    const salt = await bcrypt.genSaltSync(10, 'a');

    const guestPassword = bcrypt.hashSync('guestguest', salt);
    const userPassword = bcrypt.hashSync('useruser', salt);


    
   await queryInterface.bulkInsert('Users', [
    {
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
      firstname: 'Laura',
      lastname: 'User',
      roleId: user.id,
      email: 'laura@user.com',
      password: userPassword,
    },
    {
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
      firstname: 'Laura',
      lastname: 'Guest',
      roleId: guest.id,
      email: 'laura@guest.com',
      password: guestPassword,
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
