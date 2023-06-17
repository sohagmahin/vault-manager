const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/vaultService.js");
// jest.setTimeout(1000);

describe("Vault CRUD test suite", () => {
  test("[POST] Vault should be created", async () => {
    const authData = {
      email: "sohagmahin@gmail.com",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const vaultObj = {
      title: "fb account",
      description: "My primary fb accounts credential",
      domain: "account.fb.com",
      username: "sohag@fb.com",
      password: "123456",
    };

    const res = await request(app)
      .post("/vault")
      .set("Authorization", resLogin.body.access_token)
      .send(vaultObj);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("fb account");
    expect(res.body.data.description).toBe("My primary fb accounts credential");
    expect(res.body.data.domain).toBe("account.fb.com");
  });
  it("[GET] should return all vaults", async () => {
    const authData = {
      email: "sohagmahin@gmail.com",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .get("/vault/all")
      .set("Authorization", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3);
  });

  it("[GET] should return single vault", async () => {
    const authData = {
      email: "sohagmahin@gmail.com",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .get("/vault/62fbc4527efeb465d3a2d97e")
      .set("Authorization", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("test account");
  });

  it("[PUT] should be update vault", async () => {
    const authData = {
      email: "sohagmahin@gmail.com",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .put("/vault/62fbc4527efeb465d3a2d97e")
      .set("Authorization", resLogin.body.access_token)
      .send({ title: "update title" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("update title");
  });

  it("[DELETE] should be delete", async () => {
    const authData = {
      email: "sohagmahin@gmail.com",
      password: "123456",
    };
    const resLogin = await request(app).post("/user/login").send(authData);
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.access_token).toBeDefined();

    const res = await request(app)
      .delete("/vault/62fbc4527efeb465d3a2d97e")
      .set("Authorization", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Delete success!");
  });
});
