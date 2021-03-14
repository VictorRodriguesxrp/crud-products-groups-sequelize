require('dotenv/config');

module.exports = {
  "dialect": 'postgres',
  "host": "localhost",
  "username": 'postgres',
  "password": '123',
  "database": 'dbPratica',
  "define": {
      "timestamps": true,
      "underscored": true,
      "underscoredAll": true
  }
}