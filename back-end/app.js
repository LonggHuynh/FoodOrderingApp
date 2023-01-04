const express = require('express')
const cors = require('cors')
const app = express()
const orders = require('./routes/Order')
const users = require('./routes/User')
const restaurants = require('./routes/Restaurant')
const errorHandler = require('./middlewares/errorHandler')



app.use(cors({
    origin:"*",
}))


app.use(express.json());

app.use('/api/v1/orders', orders);
app.use('/api/v1/users', users);
app.use('/api/v1/restaurants', restaurants);




app.use(errorHandler);
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listenning on  ${port}`))
    } catch (err) {
        console.log(err)
    }
}

app.use(errorHandler);

start()