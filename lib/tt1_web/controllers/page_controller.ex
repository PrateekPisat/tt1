defmodule Tt1Web.PageController do
  use Tt1Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
