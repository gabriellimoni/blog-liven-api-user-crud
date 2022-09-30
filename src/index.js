import { connect } from "./database/index.js";
import { port } from "./env.js";
import app from "./server.js";

connect().then(() => {
  app.listen(port, function () {
    console.log(`Running on port ${port}`);
  });
});
