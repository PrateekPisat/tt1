defmodule Tt1Web.PostController do
  use Tt1Web, :controller

  alias Tt1.Social
  alias Tt1.Social.Post

  action_fallback Tt1Web.FallbackController

  def index(conn, _params) do
    posts = Social.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
         if token["user_id"] == user_id do
            with {:ok, %Post{} = post} <- Social.create_post(post_params) do
              conn
              |> put_status(:created)
              |> put_resp_header("location", post_path(conn, :show, post))
              |> render("show.json", post: post)
            end
        else
          IO.inspect({:bad_match, post_params["user_id"], user_id})
          raise "Your're not the right user"
        end
      {:error, _} ->
        IO.inspect({:bad_match, post_params["user_id"]})
        raise "Invalid Token!"
    end
  end

  def show(conn, %{"id" => id}) do
    post = Social.get_post!(id)
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params, "token" => token}) do
    post = Social.get_post!(id)
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if post.user_id == user_id do
          with {:ok, %Post{} = post} <- Social.update_post(post, post_params) do
          render(conn, "show.json", post: post)
          end
        else
          IO.inspect({:bad_match, post_params["user_id"], user_id})
          raise "Your're not the right user"
        end
      {:error, _} ->
        IO.inspect({:bad_match, post_params["user_id"]})
        raise "Invalid Token!"
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    post = Social.get_post!(id)
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if user_id == post.user_id do
          with {:ok, %Post{}} <- Social.delete_post(post) do
            send_resp(conn, :no_content, "")
          end
        else
          raise "Your're not the right user"
        end
      {:error, _} ->
        raise "Invalid Token."
    end
  end
end
