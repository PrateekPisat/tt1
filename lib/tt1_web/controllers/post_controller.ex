defmodule Tt1Web.PostController do
  use Tt1Web, :controller

  alias Tt1.Social
  alias Tt1.Social.Post
  alias Tt1.Accounts
  alias Tt1.Accounts.User

  def index(conn, _params) do
    posts = Social.list_posts()
    render(conn, "index.html", posts: posts)
  end

  def new(conn, _params) do
    users = Accounts.list_users
    changeset = Social.change_post(%Post{})
    render(conn, "new.html", changeset: changeset, users: users)
  end

  def create(conn, %{"post" => post_params}) do
    user = Accounts.get_user!(get_session(conn, :user_id))
    users = Accounts.list_users
    cond do
      String.to_integer(post_params["hoursspent"]) >= 15 &&
         rem(String.to_integer(post_params["hoursspent"]), 15) == 0 ->
      err = try do
        post_user = Accounts.get_user!(post_params["user_id"])
        case Social.create_post(post_params) do
          {:ok, post} ->
            conn
            |> put_flash(:info, "Task assigned to #{post_user.name}.")
            |> redirect(to: user_path(conn, :show, user))
          {:error, %Ecto.Changeset{} = changeset} ->
            render(conn, "new.html", changeset: changeset, users: users)
        end
        rescue
        Ecto.NoResultsError ->
          changeset = Social.change_post(%Post{})
          conn
          |> put_flash(:error, "Please select a User_id from the list mentioned in the page.")
          |> render("new.html", users: users, changeset: changeset)
      end
      String.to_integer(post_params["hoursspent"]) < 0 ->
        changeset = Social.change_post(%Post{})
        conn
        |> put_flash(:error, "Time can't be negative.")
        |> render("new.html", users: users, changeset: changeset)
      true ->
        changeset = Social.change_post(%Post{})
        conn
        |> put_flash(:error, "Time Spent should be in intervals of 15.")
        |> render("new.html", users: users, changeset: changeset)
      end
  end

  def show(conn, %{"id" => id}) do
    post = Social.get_post!(id)
    user = Accounts.get_user!(post.user_id)
    render(conn, "show.html", post: post, user: user)
  end

  def edit(conn, %{"id" => id}) do
    post = Social.get_post!(id)
    user = Accounts.get_user!(post.user_id)
    users = Accounts.list_users
    changeset = Social.change_post(post)
    render(conn, "edit.html", post: post, changeset: changeset, user: user, users: users)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Social.get_post!(id)
    user = Accounts.get_user!(post.user_id)
    users = Accounts.list_users
    changeset = Social.change_post(post)
    if String.to_integer(post_params["hoursspent"]) >= 15 &&
       rem(String.to_integer(post_params["hoursspent"]), 15) == 0 do
      case Social.update_post(post, post_params) do
        {:ok, post} ->
          conn
          |> put_flash(:info, "Task updated successfully.")
          |> redirect(to: user_path(conn, :show, user))
        {:error, %Ecto.Changeset{} = changeset} ->
          render(conn, "edit.html", post: post, changeset: changeset)
      end
    else
      conn
      |> put_flash(:error, "Time Spent should be in intervals of 15.")
      |> render("edit.html", post: post, changeset: changeset, user: user, users: users)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Social.get_post!(id)
    user = Accounts.get_user!(post.user_id)
    {:ok, _post} = Social.delete_post(post)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: user_path(conn, :show, user))
  end
end
