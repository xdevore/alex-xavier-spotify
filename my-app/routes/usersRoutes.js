const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/")
  .post(userController.createUser);

router.route("/:spotifyUserId/populate-songs")
  .post(userController.populateSongs);


module.exports = router;