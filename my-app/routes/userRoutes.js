const router = require("express").Router();
const userController = require('../controllers/userController.js'); 

router.route("/").post(userController.addUser)


router.route("/:userId/timestamp").post(userController.updateTime)


router.route("/:userId/timestamp").get(userController.getTime)

module.exports = router;
