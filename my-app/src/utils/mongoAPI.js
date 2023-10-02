import axios from "axios";

export default {
  createUser: function(spotifyUserId) {
    return axios.post("/api/users", { spotifyUserId });
  },
  populateSongs: function(spotifyUserId) {
    return axios.post(`/api/users/${spotifyUserId}/populate-songs`);
  }
};