defmodule Tt1Web.UserController do
  use Tt1Web, :controller

  alias Tt1.Accounts
  alias Tt1.Accounts.User
  alias Tt1.Social
  alias Tt1.Social.Post
  alias Tt1Web.PageController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.html", users: users)
  end

  def new(conn, _params) do
    changeset = Accounts.change_user(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
      case Accounts.create_user(user_params) do
        {:ok, user} ->
          conn
          |> put_session(:user_id, user.id)
          |> put_flash(:info, "User created successfully.")
          |> redirect(to: user_path(conn, :show, user))
        {:error, %Ecto.Changeset{} = changeset} ->
          render(conn, "new.html", changeset: changeset)
      end
  end

  def show(conn, %{"id" => id}) do
      user = Accounts.get_user!(id)
      post = Social.get_all_posts(id)
      render(conn, "show.html", user: user, post: post)
  end

  def edit(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    changeset = Accounts.change_user(user)
    render(conn, "edit.html", user: user, changeset: changeset)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    {:ok, _user} = Accounts.delete_user(user)

    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "User deleted successfully.")
    |> redirect(to: "/")
  end

  def login(conn, %{"name" => name}) do
    user = Accounts.get_user_by_name(name)
    if length(user) == 1 do
      conn
      |> put_flash(:info, "Login Successful")
      |> redirect(to: user_path(conn, :show, user))
    else
      conn
      |> put_flash(:error, "Invalid User-Id")
      |> render("index.html", users: user)
    end
  end
end
