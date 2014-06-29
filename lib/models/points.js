'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Point Schema
 */
var PointSchema = new Schema({
  name: String,
  tour: String,
  details: String,
  points : Number
});

mongoose.model('Point', PointSchema);
