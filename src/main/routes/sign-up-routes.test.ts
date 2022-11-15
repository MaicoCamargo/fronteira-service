import app from "../config/app";
import request from "supertest";

describe("SignUp Routes", () => {
  test("Deve retornar uma conta em caso de sucesso", async () => {
    await request(app)
      .post("/service/sign-up")
      .send({ name: "Maico", email1: "email@email.com", password: "123" })
      .expect(200);
  });
});
