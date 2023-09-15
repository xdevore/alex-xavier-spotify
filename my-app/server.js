const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // <-- Import the cors library
const app = express();
const PORT = 6969;

app.use(cors());  // <-- Use the cors middleware here

app.use(bodyParser.json());

// Routes import
const spotifyRoutes = require('./routes/spotifyRoutes');
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

