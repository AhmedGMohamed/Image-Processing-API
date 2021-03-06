import express from "express";
import api from "./routes/index";

const app = express();
const port = 8080;

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Main page visited");
});

app.use("/api", api);

//starts the server on the specified port
app.listen(port, (): void => {
  console.log(`Server started at localhost:${port}`);
});

export default app;
