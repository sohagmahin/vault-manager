const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

jest.mock("../../services/userService.js");

afterEach(() => {
  jest.clearAllMocks();
});

//unit test

describe("Auth test suite.", () => {
  describe("Login test", () => {
    test("valid user -> status code should be 200 and returned object should have jwt token", async () => {
      const authData = {
        email: "sohagmahin@gmail.com",
        password: "123456",
      };
      const res = await request(app).post("/user/login").send(authData);
      expect(res.statusCode).toBe(200);
      expect(res.body.access_token).toBeDefined();
    });

    test("password missing -> status code should be 400 (Bad request)", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({ email: "sohagmah" });
      expect(res.statusCode).toBe(400);
    });

    test("email missing -> status code should be 400 (Bad request)", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({ password: "sohagmahin@" });
      expect(res.statusCode).toBe(400);
    });

    test("response type should be json", async () => {
      // expect("sohag").toBe("sohag");
      const res = await request(app)
        .post("/user/login")
        .send({ email: "sohagmahin", password: "123456" });
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
      expect(res.body.errors.email.msg).toBe(
        "email is required and should be five character!"
      );
    });

    test("input existing user -> should return 200 and user already exist! ", async () => {
      const reqBody = {
        name: "sohag",
        email: "sohagmahin",
        password: "123456",
      };
      const res = await request(app).post("/user/signup").send(reqBody);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("email already exist!");
    });

    test("valid input -> should return 201 and success message", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({ name: "New user", email: "newuser", password: "newuser@" });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Signup success");
    });
  });
});

describe("User CRUD test suite", () => {
  it("[GET] should return all user", async () => {
    const authData = {
      email: "sohagmahin",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .get("/user/all")
      .set("Authorization", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3);
  });

  it("[GET] should return single user", async () => {
    const authData = {
      email: "sohagmahin",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .get("/user/62ea48060e07f7fc6c119345")
      .set("Authorization", resLogin.body.access_token);
    // console.log(res.body.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe("sohagmahin");
  });

  it("[PUT] should be update", async () => {
    const authData = {
      email: "sohagmahin",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .put("/user/62ea48060e07f7fc6c119345")
      .set("Authorization", resLogin.body.access_token)
      .send({ name: "sohag update" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("sohag update");
  });

  it("[DELETE] should be delete", async () => {
    const authData = {
      email: "sohagmahin",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .delete("/user/62ea545f539f5aeca7bd079f")
      .set("Authorization", resLogin.body.access_token);
    // console.log(res.body.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("delete success");
  });
});
