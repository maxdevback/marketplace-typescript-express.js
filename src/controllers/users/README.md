This controller is responsible for the entity of the user /users/.

- ## Query:

  usernamePart: string,
  page: number min(1),
  pageSize: number min(5),

- ## ENDPOINTS:
- GET "/": Get all users. Here you can use query
- GET "/:userId": Get user by id
- POST "/auth/login": Login for user (More about authorization in the auth middleware file) body: {username: string, password: string}
- POST "/auth/register": Register for user (More about authorization in the auth middleware file): {username: string, password: string}
- PATCH "/": Change user data. including avatar (more details in the file): {username?: string, about?: string, avatar: with any name}
- DELETE "/": Logout from the account
- DELETE "/del": Delete account
