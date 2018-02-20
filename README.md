# Task Tracker 1

# Design Choices:

1. Login:
When a user logs in, their user id will be stored as a session variable, instead of storing the entire user object. Since the space allocated to cookies is browser specific, stroing the entire user object, for a large number of users, might cause an overflow.

2. Assigning Tasks:
Each time the user assigns a task, user must enter the user id of the user to who the task is to be assigned. A list of usernames along with their user-ids will be provided on such a page to assist the user.

3. Complete Tasks:
After a user has marked a task as complete, the user will be allowed to mark the task as incomplete in the future(the task won't be deleted as ssons ass it is marked as complete), so as to allow the user to make certain changes to the task if he finds it necessary. However, if the is user is sure that the task is in fact complete, and there are no further changes to be made, the user can optionally delete the task.

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
