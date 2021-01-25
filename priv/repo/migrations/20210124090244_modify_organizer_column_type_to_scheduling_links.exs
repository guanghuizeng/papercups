defmodule ChatApi.Repo.Migrations.ModifyOrganizerColumnTypeToSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      remove :organizer
      add :organizer, :map
    end
  end
end
