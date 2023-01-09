const express = require('express')
const cors = require('cors')
const app = express()
const orders = require('./routes/Order')
const users = require('./routes/User')
const dishes = require('./routes/Dish')
const restaurants = require('./routes/Restaurant')
const errorHandler = require('./middlewares/errorHandler')
const bodyParser = require('body-parser');


app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({
    origin:"*",
}))


app.use(express.json());

app.use('/api/v1/orders', orders);
app.use('/api/v1/users', users);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/dishes', dishes);

app.use(errorHandler);




const port = process.env.PORT || 5000;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listenning on  ${port}`))
    } catch (err) {
        console.log(err)
    }
}


start()