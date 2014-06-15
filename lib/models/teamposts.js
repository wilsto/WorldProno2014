'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Team Post Schema
 */
var TeamPostSchema = new Schema({
  postTitle: String,
  postTeam: String,
  postText: String,
  postFrom:String,
  postTo:String,
  date:{ type: Date, default: Date.now }
});

mongoose.model('TeamPost', TeamPostSchema);
