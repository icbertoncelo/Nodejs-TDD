const request = require("supertest");

const app = require("../../src/server");
const { User } = require("../../src/app/models");

describe("Authentication", () => {
  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Ian Carlos",
      email: "carlos.ian007@gmail.com",
      password_hash: "123456"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(200);
  });
});
