const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.js");

const app = express();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    UseUnifiedTopology: true
}); 
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"));


/* 
mongoose.connect("mongodb://127.0.0.1:27017/Gogo-Cafe").then(() => {
  console.log('Connected to database');
});
 */



//Midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routes
app.use("/users", userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API is now online at port ${port}`);
});