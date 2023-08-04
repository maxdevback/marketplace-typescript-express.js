import request from "supertest";
import { App } from "../../App";

describe("Testing CRUD user", () => {
  let generatedUsername = "";
  let generatedPassword = "";

  let id = "";
  let wrongId = "6123456789abcdef01234567";
  beforeAll(() => {
    generatedUsername = Math.random().toString(36).substring(2);
    generatedPassword = Math.random().toString(36).substring(2);
  });
  // test("Creating user", async () => {
  //   await request(App)
  //     .post("/users")
  //     .send({ username: generatedUsername, password: "JustPasswordForTests" })
  //     .expect(200)
  //     .expect((res) => {
  //       console.log(res.body.body._id);
  //       id = res.body.body._id;
  //     });
  // });
  test("Register", async () => {
    await request(App)
      .post("/users/auth/register")
      .send({ username: generatedUsername, password: generatedPassword })
      .expect(200)
      .expect((res) => {
        id = res.body.body._id;
      });
  });
  test("Login wrong username", async () => {
    await request(App)
      .post("/users/auth/login")
      .send({
        username: generatedUsername + "fssdfsd",
        password: generatedPassword,
      })
      .expect(404);
  });
  test("Login wrong password", async () => {
    await request(App)
      .post("/users/auth/login")
      .send({
        username: generatedUsername,
        password: generatedPassword + "gdfgffd",
      })
      .expect(404);
  });
  test("Login", async () => {
    await request(App)
      .post("/users/auth/login")
      .send({ username: generatedUsername, password: generatedPassword })
      .expect(200);
  });

  test("Get by id", async () => {
    await request(App).get(`/users/${id}`).expect(200);
  });
  test("Get by wrong id", async () => {
    await request(App).get(`/users/${wrongId}`).expect(404);
  });
  test("Validate duplicate", async () => {
    await request(App)
      .post("/users")
      .send({ username: generatedUsername, password: "JustPasswordForTests" })
      .expect(409);
  });
  test("Edit user", async () => {
    await request(App)
      .patch(`/users/${id}`)
      .send({ username: "NewUsername" })
      .expect(200);
    await request(App)
      .get(`/users/${id}`)
      .expect((res) => {
        res.body.body.username === "NewUsername";
      });
  });
  test("Edit user with wrong field", async () => {
    await request(App)
      .patch(`/users/${id}`)
      .send({ usernsdame: "NewUsername" })
      .expect(422);
    await request(App)
      .get(`/users/${id}`)
      .expect((res) => {
        res.body.body.username === "NewUsername";
      });
  });
  test("Deleting by wrong Id", async () => {
    await request(App).get(`/users/${wrongId}`).expect(404);
  });
  test("Deleting by Id", async () => {
    await request(App).delete(`/users/${id}`).expect(200);
    await request(App).get(`/users/${id}`).expect(404);
  });
});
