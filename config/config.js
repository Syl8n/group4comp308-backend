const env = require('./env/' + process.env.NODE_ENV + '.js');

env.dbUrl = `mongodb://${env.db.user}:${env.db.password}@${env.db.host}:${env.db.port}`;

module.exports = env;