const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const conf = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

(async function bootstrap () {
  try {
    await mongoose.connect(conf.MONGOOSE_URI);
    console.log('Connected to DB.');
    app.listen(conf.PORT, () => console.log('Server is listening on port ' + conf.PORT));
  } catch (error) {
    console.log(error);
  }
})();
