defmodule Tt1Web.SessionController do
  use Tt1Web, :controller
  alias Tt1.Accounts
  alias Tt1.Accounts.User

  action_fallback Tt1Web.FallbackController

  def create(conn, %{"name" => name, "password" => pass}) do
    user =  Accounts.get_user_by_name(name) |> auth_user(pass)
    with {:ok, %User{} = user}  do
    token = Phoenix.Token.sign(conn, "auth token", user.id)
    conn
    |> put_status(:created)
    |> render("token.json", user: user, token: token)
  end
end


def auth_user(user, password) do
    case Comeonin.Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end

end
