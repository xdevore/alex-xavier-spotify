const router = require("express").Router();
const seenController = require("../controllers/seenController");

router.route("/")
  .post(seenController.addSongs);

router.route('/getSongs')
    .post(seenController.getSongs);



module.exports = router;