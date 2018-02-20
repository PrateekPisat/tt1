defmodule Tt1Web.SessionController do
  use Tt1Web, :controller


  def create(conn, %{"name" => name}) do
    if name == "" || name == " " do
      conn
      |> put_flash(:error, "Invalid Username")
      |> redirect(to: "/")
    else
      user = Tt1.Accounts.get_user_by_name(name)
      if length(user) == 1 do
        conn
        |> put_session(:user_id, Enum.fetch!(user, 0).id)
        |> put_flash(:info, "Welcome Back #{Enum.fetch!(user, 0).name}")
        |> redirect(to: user_path(conn, :show, Enum.fetch!(user, 0)))
      else
        conn
        |> put_flash(:error, "Invalid Username")
        |> redirect(to: "/")
      end
    end
end

  def delete(conn, _) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged Out")
    |> redirect(to: "/")
end

end
