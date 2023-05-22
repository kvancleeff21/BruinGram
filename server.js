const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const users = require('./routes/api/users');
const passport = require('passport');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const message = require('./routes/api/message');
const path = require('path');

//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//db config
const db = require('./config/keys').mongoURI;

 mongoose.set("useUnifiedTopology", true); //to avoid deprecation warnings
 mongoose.set("useFindAndModify", false);
 mongoose.set("useCreateIndex", true);

//connect to mongodb
//DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version.To use the new parser, pass option { useNewUrlParser: true } 
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

//First route
// app.get('/', (req, res) => res.send('Hello'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/message', message);

//serve static assets if in production
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server running on port ${port}`));


