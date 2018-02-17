defmodule Tt1.Social.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tt1.Social.Post


  schema "posts" do
    field :completed, :boolean, default: false
    field :hoursspent, :integer
    field :taskname, :string
    belongs_to :user, Tt1.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:taskname, :completed, :hoursspent, :user_id])
    |> validate_required([:taskname, :completed, :hoursspent, :user_id])
  end
end
