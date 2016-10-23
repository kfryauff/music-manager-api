let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BearSchema = new Schema({
  name: {type: String}
});

module.exports = mongoose.model('Bear', BearSchema);
