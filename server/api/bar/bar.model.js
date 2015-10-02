'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BarSchema = new Schema({
  name: String,
  snippet: String,
  url: String,
  img_url: String,
  attending: Array,
  active: Boolean
});

module.exports = mongoose.model('Bar', BarSchema);
