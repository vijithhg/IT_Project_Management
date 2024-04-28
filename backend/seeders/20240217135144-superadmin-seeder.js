'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Generate hashed password
      const hashedPassword = await bcrypt.hash('admin', 10); // 10 is the salt rounds

      // Seed super admin user
      await queryInterface.bulkInsert('users', [
        {
          email: 'admin@mail.com',
          password: hashedPassword, 
          name:'Admin',
          roleId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error seeding super admin user:', error);
      // Throw the error to halt the migration process
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all rows from the mjps_users table
    await queryInterface.bulkDelete('mjps_Users', null, {});
  },
};
