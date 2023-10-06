const router = require("express").Router();
const songController = require("../controllers/songController");

router.route("/")
  .post(songController.addSong);


router.route("/:userId/")
  .get(songController.getSongsByUserId);

module.exports = router;