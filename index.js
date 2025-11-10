const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect')
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB(process.env.MONGO_URI);

const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
app.use("/",userRouter)
app.use("/events",eventRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Everything is working fine" })
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
