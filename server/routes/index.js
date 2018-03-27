const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // routes
  fs.readdirSync(__dirname + '/user/').forEach((file) => {
    require(`./user/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
