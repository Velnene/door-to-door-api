const express = require('express');

const productRouter = express.Router();
const {
  getMovies,
  createProduct,
  deleteMovie,
} = require('../controlles/product');

productRouter.get('/product', getMovies);
productRouter.post('/product', createProduct);
productRouter.delete('/product/:productId', deleteMovie);
module.exports = productRouter;
