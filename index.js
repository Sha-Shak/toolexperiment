const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));