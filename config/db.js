const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {

	let db = mongoose.connect(config.dbUrl, {
		useUnifiedTopology: true,
		useNewUrlParser: true
		})
		.then(() => {
      console.log('DB Connected!')
    })
		.catch(err => {
			console.log(err);
		});

	require('../app/models/Member');
	require('../app/models/VitalSign');
	require('../app/models/Tip');
	require('../app/models/EmergencyAlert');
  require('../app/models/Checklist');

	return db;
};