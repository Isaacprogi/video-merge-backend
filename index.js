require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');


const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all origins
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const videoMergeRoutes = require('./routes/videoMerge');

app.post('/api/videos/merge', mediaUpload.fields([{ name: 'videoA' }, { name: 'videoB' }]), videoMergeRoutes.mergeVideos);

app.use(errorHandler);


app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server is running on port ${port}`);
});
