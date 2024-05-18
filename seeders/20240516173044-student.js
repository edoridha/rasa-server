'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./db/student.json", "utf-8"))
    data.map(e=>{
     e.createdAt = new Date()
     e.updatedAt = new Date()
    })
    queryInterface.bulkInsert("Students", data)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Students", null)
  }
};
