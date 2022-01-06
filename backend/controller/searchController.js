const Movie = require("../model/movieSchema");

const search = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Movie.findById(id);
    res.status(200).json({ data: result, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

const searchAutoComplete = async (req, res) => {
  const { term, limit } = req.query;
  try {
    const results = await Movie.aggregate([
      {
        $search: {
          index: "movies",
          autocomplete: {
            query: `${term}`,
            path: "title",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      {
        $limit: limit ? Number(req.query.limit) : 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          plot: 1,
          poster: 1,
          year: 1,
          imdb: 1,
        },
      },
    ]);
    res.json({ data: results });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

const getRandom = async (req, res) => {
  try {
    const random = await Movie.aggregate([{ $sample: { size: 50 } }]);
    res.status(200).json({ data: random });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const getFirstHundred = async (req, res) => {
  try {
    const response = await Movie.find({}).limit(100);
    res.status(200).json({ data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const results = await Movie.find({
      genres: { $in: [req.params.category] },
    }).limit(50);
    res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const getByActor = async (req, res) => {
  try {
    const results = await Movie.find({
      cast: { $in: [req.params.actor] },
    }).limit(50);
    res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  search,
  searchAutoComplete,
  getRandom,
  getFirstHundred,
  getByCategory,
  getByActor,
};
