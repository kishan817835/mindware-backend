import express from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/error.middleware.js";
import userRouter from "./modules/user/user.routes.js";
import uploadRouter from "./modules/upload/upload.routes.js";
import productRouter from "./modules/product/product.routes.js";
import categoryRouter from "./modules/category/category.routes.js";


const app = express();

app.use(helmet());
const Base_url = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`${Base_url}/users`, userRouter);
app.use(`${Base_url}/upload`, uploadRouter);
app.use(`${Base_url}/products`, productRouter);
app.use(`${Base_url}/categories`, categoryRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;