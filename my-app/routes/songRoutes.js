const router = require("express").Router();
const songController = require("../controllers/userController");

router.route("/")
  .post(songController.addSong);

router.route("/:userId/")
  .post(songController.populateSongs);


module.exports = router;