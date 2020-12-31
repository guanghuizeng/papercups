defmodule ChatApi.Repo.Migrations.CreateEventTypes do
  use Ecto.Migration

  def change do
    create table(:event_types, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :string
      add :url, :string
      add :color, :string

      timestamps()
    end

  end
end
