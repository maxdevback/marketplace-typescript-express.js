import request from "supertest";
import { server } from "../../App";

describe("Testing CRUD goods", () => {
  let generatedTittle = "";
  let description =
    "This is description. I'ts must be minimum 50 length long. So it's just meanless text";
  let id = "";
  let sellerId = "64cbc0532014a3ceadb03962";
  let wrongId = "64cbb87c2e9916f696026dad";

  beforeAll(() => {
    generatedTittle = Math.random().toString(36).substring(2);
  });
  afterAll(() => {
    server.close();
  });
  test("Create", async () => {
    await request(server)
      .post("/goods")
      .send({
        title: generatedTittle,
        description: description,
        price: 777,
      })
      .expect((res) => {
        id = res.body.body._id;
      })
      .expect(200);
  });
  test("My", async () => {
    await request(server).get("/goods").expect(200);
  });
  test("Get by id", async () => {
    await request(server).get(`/goods/${id}`).expect(200);
  });
  test("Patch", async () => {
    await request(server)
      .patch(`/goods/${id}`)
      .send({
        title: generatedTittle + "sec.ver",
        description: description,
        price: 888,
      })
      .expect((res) => {
        if (res.body.body.title === generatedTittle + "sec.ver")
          throw new Error(res.body);
      })
      .expect(200);
  });
  test("getByWrongId", async () => {
    await request(server).get(`/goods/${wrongId}`).expect(404);
  });
  test("Get by sellerId", async () => {
    await request(server).get(`/goods/seller/${sellerId}`).expect(200);
  });
  test("Get all", async () => {
    await request(server).get("/goods").expect(200);
  });
  test("Delete", async () => {
    await request(server)
      .delete(`/goods/${id}`)
      .expect((res) => {})
      .expect(200);
  });
});
