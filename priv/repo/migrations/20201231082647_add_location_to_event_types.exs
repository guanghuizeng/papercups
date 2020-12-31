defmodule ChatApi.Repo.Migrations.AddLocationToEventTypes do
  use Ecto.Migration

  def change do
    alter table(:event_types) do
      add :location, :string
    end
  end
end
