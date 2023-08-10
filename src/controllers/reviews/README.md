This controller is responsible for the entity of the review /reviews/.

- Query: queries are needed to filter out unnecessary products or to search by page. Where there are queries, they are the same.
  minStars: number min(1),
  maxStars: number max(5),
  edited: boolean,
  page: number,
  pageSize: number min(5),

- ENDPOINTS
- GET "/:reviewId": Get review by id
- GET "/buyer/:buyerId": Get all the reviews that the buyer has left by id. Here you can use query
- GET "/seller/:sellerId": Get all the reviews that have been left for this seller by id. Here you can use query
- GET "/good/:goodId": Get all reviews for this good by id. Here you can use query
- POST "/:orderId" Leave a review by order id: body: {stars: number from 1 to 5, text: string}
- PATCH "/:reviewId": Modify a review by its id: body: {stars: number from 1 to 5, text: string}
- DELETE "/:reviewId": Delete review by id
