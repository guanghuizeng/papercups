defmodule ChatApi.Repo.Migrations.AddOrganizerColumnTypeToSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      add :organizer, {:array, :map}
    end
  end
end
