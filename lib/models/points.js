'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Point Schema
 */
var PointSchema = new Schema({
  name: String,
  points : {}
});

mongoose.model('Point', PointSchema);
