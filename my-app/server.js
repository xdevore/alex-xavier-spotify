const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const app = express();
const PORT = 6969;

const spotifyRoutes = require('./routes/spotifyRoutes');
const userRoutes = require('./routes/usersRoutes'); 
const songsRoutes = require('./routes/songsRoutes');

app.use(cors());  

app.use(bodyParser.json());



app.use('/spotify', spotifyRoutes);
app.use('/api/users', userRoutes); // Use your user routes under /api/users
app.use('/api/songs', songsRoutes);
 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

