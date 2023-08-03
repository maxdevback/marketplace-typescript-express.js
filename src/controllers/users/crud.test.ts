import request from "supertest";
import { App } from "../../App";

describe("Testing CRUD user", () => {
  let generatedUsername = "";
  let id = "";
  beforeAll(() => {
    generatedUsername = Math.random().toString(36).substring(2);
    console.log(generatedUsername);
  });
  test("Creating user", async () => {
    await request(App)
      .post("/users")
      .send({ username: generatedUsername, password: "JustPasswordForTests" })
      .expect(200)
      .expect((res) => {
        id = res.body._id;
      });
  });
  test("Get by id", async () => {
    await request(App).get(`/users/${id}`).expect(200);
  });
  test("Get by wrong id", async () => {
    await request(App).get(`/users/6123456789abcdef01234567`).expect(404);
  });
  test("Validate duplicate", async () => {
    await request(App)
      .post("/users")
      .send({ username: generatedUsername, password: "JustPasswordForTests" })
      .expect(409);
  });
  test("Deleting by Id", async () => {
    await request(App).delete(`/users/${id}`).expect(200);
    await request(App).get(`/users/${id}`).expect(404);
  });
});
