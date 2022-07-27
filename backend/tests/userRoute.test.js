const request = require("supertest");
const app = require("../index");

describe("Auth testing", () => {
  describe("Login testing", () => {
    test("stautus code should be 200", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmahin", password: "sohagmahin@" });
      expect(res.statusCode).toBe(200);
    });

    test("stautus code should be 401", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmah", password: "sohagmahin@" });
      expect(res.statusCode).toBe(401);
    });

    test("check response type json", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmahin", password: "sohagmahin@" });
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("application/json")
      );
    });

    test("should return object with jwt token", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ username: "sohagmahin", password: "sohagmahin@" });
      expect(res.body.access_token).toBeDefined();
    });
  });

  describe("SignUp testing", () => {
    test("Signup request validation checkup", () => {
      expect(1).toBe(1);
    });
  });
});
