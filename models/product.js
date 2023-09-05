const mongoose = require('mongoose');
const urlValid = require('../utils/urlValid');

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    require: false,
  },
  city: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator: (v) => urlValid.test(v),
      message: 'Ссылка не валидна',
    },
  },
  trailerLink: {
    type: String,
    required: false,
    validate: {
      validator: (v) => urlValid.test(v),
      message: 'Ссылка не валидна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: Number,
    required: false,
  },
  nameRU: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('product', productSchema);
