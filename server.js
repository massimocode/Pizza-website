const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://SMH110:yaaAli@ds127948.mlab.com:27948/pizza-delivery', (error) => {
    if (error) {
        console.error(error);
        return;
    }
   console.log('MongoDb connected');
});

const index = require('./router/index');
const items = require('./router/items');

const app = express();
//engine
app.engine('html', require('ejs').renderFile);
// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
//static
app.use(express.static(path.join(__dirname, 'front-end')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', index);
app.use('/api', items);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });
