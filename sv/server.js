import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routers";
import connectDataBase from "./src/config/connectDataBase";

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true,limit:'10mb' }));

initRoutes(app);
connectDataBase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
