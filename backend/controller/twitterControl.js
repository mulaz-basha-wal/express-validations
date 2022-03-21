const { body, validationResult } = require("express-validator");
let tweets = [
  {
    id: 1,
    title: "Initial tweet",
    body: "initial tweet body",
    doc: "unknown",
    author: "Mulaz Basha",
    category: "sports",
  },
];
function getTweets(req, res) {
  res.json(tweets);
}

function deleteTweet(req, res) {
  let tempList = [];
  tweets.forEach((tweet) => {
    if (tweet.id !== parseInt(req.params.id)) {
      tempList.push(tweet);
    }
  });
  tweets = [...tempList];
  res.json({ message: "tweet deleted" });
}
function deleteAll(req, res) {
  tweets = [];
  res.json({ message: "all tweets deleted" });
}
const addTweet = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Min should be 5 and Max length to be 50")
    .isAlphanumeric()
    .withMessage("Only alphanumeric title"),
  body("body")
    .trim()
    .isLength({ min: 5, max: 200 })
    .escape()
    .withMessage("Status range is 5-200"),
  body("author")
    .trim()
    .isLength({ min: 5, max: 100 })
    .isAlphanumeric()
    .escape()
    .withMessage("Author range is 5-100"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      tweets.push({
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        doc: req.body.doc,
        author: req.body.author,
        category: req.body.category,
      });
      res.json({
        message: "tweet added successfully.",
      });
    }
  },
];

module.exports = {
  getTweets,
  addTweet,
  deleteTweet,
  deleteAll,
};
