"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./api/authentication/routes");
const userRouter = require("./api/user/routes");
const reflectionRouter = require("./api/reflection/routes");
const {pool, createTables, dropTables} = require('./models/index')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(userRouter);
app.use("/reflection" , reflectionRouter)

pool.connect()
  .then(() => {
    console.log("i am database and i am working ");
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
      createTables();
    });
  })
  .catch((e) => {
    console.log(e);
  });
