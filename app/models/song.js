let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SongSchema = new Schema({
  title: { type: String },
  artist: { type: String, default: 'unknown' },
  rate: { type: Number, default: 5 }
});

module.exports = mongoose.model('Song', SongSchema);
