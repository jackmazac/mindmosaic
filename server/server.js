const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes'); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/spotify', spotifyRoutes); 
app.use('/api/spotify', spotifyRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
