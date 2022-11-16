import app from "../config/app";
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";

describe("SignUp Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const collection = await MongoHelper.getCollection("accounts");
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("Deve retornar uma conta em caso de sucesso", async () => {
    await request(app)
      .post("/service/sign-up")
      .send({ name: "Maico", email: "email@email.com", password: "123" })
      .expect(200);
  });
});
