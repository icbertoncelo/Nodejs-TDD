const request = require("supertest");

const app = require("../../src/server");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Ian Carlos",
      email: "carlos.ian007@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    const user = await User.create({
      name: "Ian Carlos",
      email: "carlos.ian007@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "password"
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt when authenticated", async () => {
    const user = await User.create({
      name: "Ian Carlos",
      email: "carlos.ian007@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("shoud be able to access private routes when authenticated", async () => {
    const user = await User.create({
      name: "Ian Carlos",
      email: "carlos.ian007@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("shoud not be able to access private routes when not authenticated", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer invalid1234`);

    expect(response.status).toBe(401);
  });
});
