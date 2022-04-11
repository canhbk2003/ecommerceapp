const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const News = new Schema({
	title: {type: String, maxLength: 255},
	content: {type: String, maxLength: 1000},
	createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('news', News);