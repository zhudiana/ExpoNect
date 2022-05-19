const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});
app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
  req.send(product);
});

mongoose
  .connect(
    "mongodb+srv://expo-nect:expo-nectpassword@exponect-cluster.hxjrt.mongodb.net/exponect-database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "exponect-database",
    }
  )
  .then(() => {
    console.log("DB connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log(api);
  console.log("server is running");
});
