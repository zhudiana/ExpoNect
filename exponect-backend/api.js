const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
//checking everything going to the server before it gets executed
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const productsRoutes = require("./Routes/products");
const categoriesRoute = require("./Routes/categories");
const exportersRoute = require("./Routes/exporters");
const importersRoute = require("./Routes/importers");
const messagesRoute = require("./Routes/messages");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/exporters`, exportersRoute);
app.use(`${api}/importers`, importersRoute);
app.use(`${api}/messages`, messagesRoute);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "exponect-real-database",
  })
  .then(() => {
    console.log("DB connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server is running");
});
