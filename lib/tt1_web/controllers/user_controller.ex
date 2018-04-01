defmodule Tt1Web.UserController do
  use Tt1Web, :controller

  alias Tt1.Accounts
  alias Tt1.Accounts.User

  action_fallback Tt1Web.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_flash(:info, "User Created!")
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params, "token" => token}) do
    user = Accounts.get_user!(id)
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if user_id == token["user_id"] do
          with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
            conn = put_flash(conn, :info, "Profile Updated!")
            render(conn, "show.json", user: user)
          end
        else
          raise "Invalid Token!"
        end
      {:error, _} ->
        raise "Invalid Token!"
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    user = Accounts.get_user!(id)
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if user_id == token["user_id"] do
          with {:ok, %User{}} <- Accounts.delete_user(user) do
            send_resp(conn, :no_content, "")
          end
        else
          raise "Invalid Token!"
        end
      {:error, _} ->
        raise "Invalid Token!"
    end
  end
end
