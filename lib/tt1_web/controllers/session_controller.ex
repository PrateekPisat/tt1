defmodule Tt1Web.SessionController do
  use Tt1Web, :controller
  alias Tt1.Accounts


  def create(conn, %{"name" => name, "password" => pass}) do
      user = Accounts.get_user_by_name(name)
      if user do
        if auth_user(user, pass) do
          conn
          |> put_session(:user_id, user.id)
          |> put_flash(:info, "Welcome Back #{user.name}")
          |> redirect( to: "/users/show/" <> to_string(user.id))
        else
          conn
          |> put_flash(:error, "Invalid Username or Password")
          |> redirect(to: "/")
        end
      else
        conn
        |> put_flash(:error, "Invalid Username or Password")
        |> redirect(to: "/")
      end
end

  def delete(conn, _) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged Out")
    |> redirect(to: "/")
end

def auth_user(user, password) do
    case Comeonin.Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end

end
