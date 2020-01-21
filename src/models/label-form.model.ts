import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelFormSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  production: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model('LabelForm', LabelFormSchema);