import { port } from "./env.js";
import app from "./server.js";

app.listen(port, function () {
  console.log(`Running on port ${port}`);
});
