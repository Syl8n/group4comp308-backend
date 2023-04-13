const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
	const db = mongoose.connect(config.dbUrl, {
		useUnifiedTopology: true,
		useNewUrlParser: true
		})
		.then(() => console.log('DB Connected!'))
		.catch(err => {
			console.log(err);
		});

	// require('../model/Nurse');
	// require('../model/Patient');

	return db;
};