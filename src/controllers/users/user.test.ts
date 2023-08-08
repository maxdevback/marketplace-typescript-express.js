import request from "supertest";
import { server } from "../../App";

describe("Testing CRUD user", () => {
  let generatedUsername = "";
  let generatedPassword = "";
  let id = "";
  let wrongId = "64cbb87c2e9916f696026dad";
  beforeAll(() => {
    generatedUsername = Math.random().toString(36).substring(2);
    generatedPassword = Math.random().toString(36).substring(2);
  });
  afterAll(() => {
    server.close();
  });
  test("Register", async () => {
    await request(server)
      .post("/users/auth/register")
      .send({ username: generatedUsername, password: generatedPassword })
      .expect(200);
  });
  test("Login wrong username", async () => {
    await request(server)
      .post("/users/auth/login")
      .send({
        username: generatedUsername + "fssdfsd",
        password: generatedPassword,
      })
      .expect(404);
  });
  test("Login wrong password", async () => {
    await request(server)
      .post("/users/auth/login")
      .send({
        username: generatedUsername,
        password: generatedPassword + "gdfgffd",
      })
      .expect(404);
  });
  test("Login", async () => {
    await request(server)
      .post("/users/auth/login")
      .send({ username: generatedUsername, password: generatedPassword })
      .expect((res) => {
        id = res.body.body._id;
      })
      .expect(200);
  });

  test("Get by id", async () => {
    await request(server).get(`/users/${id}`).expect(200);
  });
  test("Get by wrong id", async () => {
    await request(server).get(`/users/${wrongId}`).expect(404);
  });
  test("Validate duplicate", async () => {
    await request(server)
      .post("/users")
      .send({ username: generatedUsername, password: "JustPasswordForTests" })
      .expect(409);
  });
  test("Edit user", async () => {
    await request(server)
      .patch(`/users/${id}`)
      .send({ username: generatedUsername + "111" })
      .expect(200);
    await request(server)
      .get(`/users/${id}`)
      .expect((res) => {
        if (res.body.body.username !== generatedUsername + "111")
          throw new Error(res.body);
      });
  });
  test("Edit user with wrong field", async () => {
    await request(server)
      .patch(`/users/${id}`)
      .send({ usernsdame: "NewUsername" })
      .expect(422);
    await request(server)
      .get(`/users/${id}`)
      .expect((res) => {
        res.body.body.username === "NewUsername";
      });
    //TODO:
  });
  test("Deleting by wrong Id", async () => {
    await request(server).get(`/users/${wrongId}`).expect(404);
  });
  test("Deleting by Id", async () => {
    await request(server).delete(`/users/${id}`).expect(200);
    await request(server).get(`/users/${id}`).expect(404);
  });
});
