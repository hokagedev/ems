const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./src/routes/routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9999;
const db = mongoose.connection;

dotenv.config();

// connect db
mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log('DB Connected!'));

db.on('error', (err) => {
    console.log('DB connection error:', err.message);
});

app.use(morgan("dev"));
// const corsOptions = {
//     origin: '*',
//     credentials: true
// };
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use('/', routes);

app.listen(PORT, () => {
    console.log('Server started on http://localhost:' + PORT)
});

module.exports = app;