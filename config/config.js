const env = require('./env/' + process.env.NODE_ENV + '.js');

env.dbUrl = `${env.db.socket}://${env.db.user}:${env.db.password}@${env.db.host}${env.db.options}`;
env.dbUri = `${env.db.socket}://${env.db.user}:${env.db.password}@${env.db.host}/${env.db.database}${env.db.options}`;

module.exports = env;