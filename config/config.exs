# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tt1,
  ecto_repos: [Tt1.Repo]

# Configures the endpoint
config :tt1, Tt1Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WnWLO7Om6qxr0yQEZvIpBt0bCD0rNqO3iNQk79bVwbLOG6SxZE9ry1x53HXGcXWq",
  render_errors: [view: Tt1Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tt1.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
