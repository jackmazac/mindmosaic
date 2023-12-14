const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(morgan('dev'));

const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/spotify', spotifyRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
