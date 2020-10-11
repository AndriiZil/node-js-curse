const FilmModel = require('./films.model');

class FilmsController {

  async getFilms(req, res, next) {
    try {
      const { sort, skip, limit } = req.query;

      const films = await FilmModel.find()
        .sort(sort ? { name: parseInt(sort) } : 0)
        .skip(skip ? parseInt(skip) : 0)
        .limit(limit ? parseInt(limit) : 0);

      return res.send(films);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new FilmsController();
