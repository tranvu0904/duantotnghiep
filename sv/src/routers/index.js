import authRouter from "./auth";
import insertRouter from "./insert.js";
import categoryRouter from "./category.js";
import postRouter from "./post.js";
import priceRouter from "./price.js";
import areaRouter from "./area.js";
import provinceRouter from "./province.js";
import userRouter from "./user.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", userRouter);

  return app.use("/", (req, res) => {
    res.send("server on ....");
  });
};

export default initRoutes;
