const router = require("express").Router();
const songController = require("../controllers/songController");

router.route("/")
  .post(songController.addSongs);


  router.route("/:userId/:start/:end")
  .get(songController.getSongs);

module.exports = router;

// const addSongs = async () => {
//   try {
//       const data = {
//           userId: "exampleUserId",
//           songs: [
//               {
//                   songId: "song1Id",
//                   timestamp: "2023-10-08T10:10:10Z",
//                   unixTimestamp: 1688868610  // UNIX timestamp for the above date-time
//               },
//               {
//                   songId: "song2Id",
//                   timestamp: "2023-10-08T10:15:10Z",
//                   unixTimestamp: 1688868910  // UNIX timestamp for the above date-time
//               }
//           ]
//       };

//       const response = await axios.post('http://your_server_url/', data);
      
//       console.log('Response:', response.data);

//   } catch (error) {
//       console.error('Error adding songs:', error);
//   }
// };