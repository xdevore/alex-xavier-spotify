const User = require("../models/userModel"); 

module.exports = {
    createUser: async (req, res) => {
        try {
          
          let user = await User.findOne({ spotifyUserId: req.body.spotifyUserId });
          if (!user) {
            
            user = await User.create({ spotifyUserId: req.body.spotifyUserId });
          }
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      }
//   populateSongs: async (req, res) => {
//     try {
      
//       res.json(updatedUser);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
};