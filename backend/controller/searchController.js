const Movie = require("../model/movieSchema");
const Purchase = require("../model/purchaseSchema");

const search = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await Movie.findById(id);
      res.status(200).json({ data: result, success: true });
    } else {
      res.status(404).json({ success: false });
    }
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

const checkPayment = async (req, res) => {
  const { uid, mid } = req.query;
  try {
    const response = await Purchase.findOne({
      movieId: mid,
      uid,
      paymentSuccess: true,
    });
    if (response)
      res.status(200).json({ paymentSuccess: response.paymentSuccess });
    else res.status(404).json({ paymentSuccess: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const getPaidMovies = async (req, res) => {
  const { uid } = req.query;
  try {
    let purchasedMovieIds = [];
    const purchaseData = await Purchase.find({ uid, paymentSuccess: true });
    if (purchaseData) {
      purchaseData.forEach((doc) => {
        purchasedMovieIds.push(doc.movieId);
      });
    }
    const movieData = await Movie.find({ _id: { $in: purchasedMovieIds } });
    res.status(200).json({ data: movieData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

const getFavorites = async (req, res) => {
  const { arr } = req.body;
  try {
    const movieData = await Movie.find({ _id: { $in: arr } });
    res.status(200).json({ data: movieData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  search,
  searchAutoComplete,
  getRandom,
  checkPayment,
  getPaidMovies,
  getFavorites,
};
