const express = require('express');
const { PropertyRouter } = require('./Routes/PropertyRoute');
const { connection } = require('./db');
const { userRouter } = require('./Routes/user.route');
const cors= require('cors');
const app = express();
app.use(cors())
app.use(express.json());
app.use("/users", userRouter);
// Define routes and middleware here
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
app.use("/property",PropertyRouter)
app.listen(5050, async () => {
    try {
      await connection;
      console.log("connected to db");
    } catch (error) {
      console.log(error);
    }
    console.log("Server is running at 5050");
  });
