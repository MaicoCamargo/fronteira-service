import app from "../config/app";
import request from "supertest";

describe("Content-type Middleware", () => {
  test("Deve conter o header content-type: json por padrão", async () => {
    app.get("/content-type", (req, res) => {
      res.send(req.body);
    });
    await request(app).get("/content-type").expect("content-type", /json/);
  });

  test("Deve conter o header content-type: xml se forçado", async () => {
    app.get("/content-type-xml", (req, res) => {
      res.type("xml");
      res.send(req.body);
    });
    await request(app).get("/content-type-xml").expect("content-type", /xml/);
  });
});
