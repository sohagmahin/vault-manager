const request = require("supertest");
const app = require("../app");
jest.mock("../services/userService.js");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Auth test suite.", () => {
  describe("Login test", () => {
    test("valid user -> status code should be 200 and returned object should have jwt token", async () => {
      const authData = {
        username: "sohagmahin",
        password: "123456",
      };
      const res = await request(app).post("/user/login").send(authData);
      expect(res.statusCode).toBe(200);
      expect(res.body.access_token).toBeDefined();
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
        .send({ username: "sohagmahin", password: "123456" });
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("application/json")
      );
    });
  });

  describe("SignUp test", () => {
    test("check validation -> should return 400(Bad request) and and errors ", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({ name: "sohag", password: "sohagmahin@" });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors.username.msg).toBe(
        "username is required and should be five character!"
      );
    });

    test("input existing user -> should return 200 and user already exist! ", async () => {
      const reqBody = {
        name: "sohag",
        username: "sohagmahin",
        password: "123456",
      };
      const res = await request(app).post("/user/signup").send(reqBody);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Username already exist!");
    });

    test("valid input -> should return 201 and success message", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({ name: "New user", username: "newuser", password: "newuser@" });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Signup success");
    });
  });
});
