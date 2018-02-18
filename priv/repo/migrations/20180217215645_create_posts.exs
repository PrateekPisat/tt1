defmodule Tt1.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :taskname, :string
      add :completed, :boolean, default: false, null: false
      add :hoursspent, :integer
      add :body, :text
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:posts, [:user_id])
  end
end
