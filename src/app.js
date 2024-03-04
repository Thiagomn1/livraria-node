import express from "express";
import db from "../src/config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão no MongoDB"));
db.once("open", () => {
  console.log("MongoDB Conectado");
});

const app = express();

routes(app);

export default app;
