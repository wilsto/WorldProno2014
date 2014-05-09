'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Prono Schema
 */
var PronoSchema = new Schema({
  name: String,
  info: String,
  awesomeness: Number
});

mongoose.model('Prono', PronoSchema);
