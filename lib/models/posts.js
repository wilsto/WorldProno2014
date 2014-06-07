'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Prono Schema
 */
var PostSchema = new Schema({
  postTitle: String,
  postImage: String,
  postText: String,
  date:{ type: Date, default: Date.now }
});

mongoose.model('Post', PostSchema);
