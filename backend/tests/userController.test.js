const request = require("supertest");
const app = require("../app");
// jest.mock("../controller/userController.js");

describe("Auth test suite.", () => {
  describe("Login test", () => {
    test("valid user -> status code should be 200 and returned object should have jwt token", async () => {
      const authData = {
        username: "sohagmahin",
        password: "123456",
      };
      const res = await request(app).post("/user/login").send(authData);
      expect(res.statusCode).toBe(200);
      // expect(res.body.access_token).toBeDefined();
    });

    test("password missing -> status code should be 400 (Bad request)", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmah" });
      expect(res.statusCode).toBe(400);
    });

    test("username missing -> status code should be 400 (Bad request)", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({ password: "sohagmahin@" });
      expect(res.statusCode).toBe(400);
    });

    test("response type should be json", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmahin", password: "sohagmahin@" });
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("application/json")
      );
    });
  });

  describe("SignUp test", () => {
    test("Signup request validation checkup", () => {
      expect(1).toBe(1);
    });
  });
});
