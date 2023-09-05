const Movie = require('../models/product');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { OK, CREATED } = require('../respons/responsStatus');

const getMovies = (req, res, next) => {
  const { _id: owner } = req.user;

  Movie.find({ owner })
    .populate(['owner'])
    .sort({ createdAt: -1 })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const getItemsByCategory = (req, res, next) => {
  const { category: categor } = req.body;

  Movie.find({ categor })
    // .populate(['owner'])
    .sort({ createdAt: -1 })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const createProduct = (req, res, next) => {
  const owner = req.user._id;
  const {
    category,
    city, year,
    description,
    image,
    trailerLink,
    nameRU,
  } = req.body;
  Movie.create({
    category,
    city,
    year,
    description,
    image,
    trailerLink,
    owner,
    nameRU,
  })
    .then((product) => {
      res.status(CREATED).send(product);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError('Поля неверно заполнены'));
      }
      return next(e);
    });
};

const deleteMovie = (req, res, next) => {
  const { productId } = req.params;
  Movie.findById(productId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Невалидный id фильма');
      } else if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(productId)
          .then(() => {
            res.status(200).send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Можно удалять только свои фильмы');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createProduct,
  deleteMovie,
  getItemsByCategory,
};
