const Sequelize = require("sequelize");

const URI = `postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/messenger`;

const db = new Sequelize(process.env.DATABASE_URL || URI, {
  logging: false
});

module.exports = db;
