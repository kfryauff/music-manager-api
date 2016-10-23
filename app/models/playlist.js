let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlaylistSchema = new Schema({
  title: { type: String, required: true },
  song_ids: [{ type: Schema.Types.ObjectId, ref: 'Song', default: [] }],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
