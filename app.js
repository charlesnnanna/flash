const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys')
const passport = require('passport');
const cookieSession = require('cookie-session');
mongoose.connect(keys.MONGO_URI, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true});
const connection = mongoose.connection;
require('./models/user');
require('./services/passport');


app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 60 * 1000,
        keys : [...keys.SESSION_KEYS]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
connection.once('open', () => {
    console.log('Database conected successfully')
})


app.listen(PORT, () => {
    console.log("Server Listening at port 5000")
})