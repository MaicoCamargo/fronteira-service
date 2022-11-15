import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import { ENV } from "./config/env";

MongoHelper.connect(ENV.MONGO_URL)
  .then(async () => {
    console.log("Connect on mongodb\n");
    const app = (await import("./config/app")).default;
    app.listen(5050, () =>
      console.log(`I am running...listen on http://127.0.0.1:${ENV.PORT}\n`)
    );
  })
  .catch(console.error);
