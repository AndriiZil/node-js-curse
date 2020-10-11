const UserModel = require('./models/UserModel');
const FilmModel = require('./models/FilmModel');
const ProgramModel = require('./models/ProgramModel');

class AggregateController {

  async createNewUser(req, res, next) {
    try {
      const user = await UserModel.create(req.body);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }

  async createNewFilm(req, res, next) {
    try {
      const film = await FilmModel.create(req.body);

      return res.send(film);
    } catch (err) {
      next(err);
    }
  }

  async createNewProgram(req, res, next) {
    try {
      const program = await ProgramModel.create(req.body);

      return res.send(program);
    } catch (err) {
      next(err);
    }
  }

  async getAggregateProgram(req, res, next) {
    try {
      const aggregateProgram = await ProgramModel.aggregate([
        { $lookup: {
            from: FilmModel.collection.name,
            let: { filmId: '$filmId' },
            pipeline: [
              { $match: { $expr: { $eq: [ '$_id', '$$filmId' ] } } },
              { $lookup: {
                  from: UserModel.collection.name,
                  let: { userId: "$userId" },
                  pipeline: [
                    { $match: { $expr: { $eq: [ '$_id', '$$userId' ] } } },
                  ],
                  as: 'userId'
                }},
              { $unwind: '$userId' }
            ],
            as: 'filmId'
          }},
        { $unwind: '$filmId' }
      ]);

      return res.send(aggregateProgram);
    } catch (err) {
      next(err);
    }
  }

  async getPopulateProgram(req, res, next) {
    try {
      const populated = await ProgramModel
        .find()
        .populate([
          { path: 'filmId', populate: { path: 'userId' } }
        ]);

      return res.send(populated);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new AggregateController();
