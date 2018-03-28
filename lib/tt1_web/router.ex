defmodule Tt1Web.Router do
  use Tt1Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    #plug :fetch_current_user
    #plug :protect_from_forgery
    #plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

#  def fetch_current_user(conn, _) do
#      user_id = get_session(conn, :user_id)
#      if user_id do
#        user = Tt1.Accounts.get_user!(user_id)
#        assign(conn, :current_user, user)
#      else
#        assign(conn, :current_user, false)
#      end
#  end

  scope "/", Tt1Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
    get "/session", SessionController, :delete
    get "/users/new", PageController, :index
    get "users/show/:id", PageController, :index
    get "users/edit/:id", PageController, :index

  end

  # Other scopes may use custom stacks.
   scope "/api/v1/", Tt1Web do
     pipe_through :api

     resources "/users", UserController, except: [:new, :edit]
   end
end
