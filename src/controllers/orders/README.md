This controller is responsible for the entity of the order /orders.
It's got these endpoints

- ENDPOINTS
- GET "/seller": This is where you can get your orders as a seller
- GET "/buyer": This is where you can get your orders as a buyer
- GET "/good/:goodId" Get orders for goods by id if you are the owner
- POST "/:goodId": Create order by good id: body: {contactInfo: string}
- PATCH "/status/:orderId": Change order status by order id: body: {newStatus: string}
- PATCH "/:orderId": Change order by id if order status is "unconfirmed": body: any of order fields
- DELETE "/:orderId" "Delete an order by id if you bought and the order is unconfirmed"
