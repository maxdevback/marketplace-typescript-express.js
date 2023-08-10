This controller is responsible for the entity of the good /goods/.

- Query: queries are needed to filter out unnecessary products or to search by page. Where there are queries, they are the same.
  query structure:
  title: string min(5) max(200),
  description: string, min(10) max(200),
  minPrice: number min(1) max(9999),
  maxPrice: number min(1) max(9999),
  page: number min(1),
  pageSize: number min(10),

- ENDPOINTS
- GET "/": Allows you to retrieve all goods. It is possible to use query
- GET "/my": If the user is authorized (more info in auth middleware), then you can get all the goods that you have posted. It is possible to use query
- GET "/seller/:sellerId": Allows you to get all goods of a certain seller by id. It is possible to use query
- GET "/:goodId": Allows you to retrieve a good by id
- POST "/": Allows you to create a good and also add images to it via form-data. body: {title: string, description: string, price: number}
- PATCH "/:goodId": Allows you to change the good by id: body: any part or creation body
- DELETE "/:goodId": Allows you to delete good by id
