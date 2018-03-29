defmodule Tt1Web.PostView do
  use Tt1Web, :view
  alias Tt1Web.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      name: post.name,
      body: post.body,
      completed: post.completed,
      time: post.time,
      user_id: post.user_id}
  end
end
