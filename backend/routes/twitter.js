var express = require("express");
var router = express.Router();
var twitterController = require("../controller/twitterControl");

router.get("/", twitterController.getTweets);
router.post("/add_tweet", twitterController.addTweet);
router.delete("/delete/:id", twitterController.deleteTweet);
router.delete("/delete_all", twitterController.deleteAll);
module.exports = router;
