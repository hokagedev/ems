const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const config = require('./configs');
const MongoStore = require('connect-mongo')(session);
const mongooseConn = require('./configs/mongoose');
const routes = require('./routes');

dotenv.config({
  path: '.env'
});
const app = express();
app.set('port', process.env.PORT || 9999);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
    secret: config.secret.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongooseConn
    })
}));
app.use('/', routes);

module.exports = app;
