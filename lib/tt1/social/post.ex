defmodule Tt1.Social.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tt1.Social.Post


  schema "posts" do
    field :body, :string
    field :completed, :boolean, default: false
    field :time, :integer
    field :name, :string, null: false
    belongs_to :user, Tt1.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:name, :completed, :time, :body, :user_id])
    |> validate_required([:name, :completed, :time, :body, :user_id])
  end
end
