const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  
const app = express();
const PORT = 7001;

const spotifyRoutes = require('./routes/spotifyRoutes');
const songRoutes = require('./routes/songRoutes'); 
const userRoutes = require('./routes/userRoutes');
const seenRoutes = require('./routes/seenRoutes');

const mongoURI = 'mongodb://localhost:27017/RockOut'; 
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

app.use(cors());  

app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

app.use('/spotify', spotifyRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seen', seenRoutes);
 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

