defmodule ChatApi.Repo.Migrations.AddScheduledEventsFields do
  use Ecto.Migration

  def change do
    alter table(:scheduled_events) do
      add :fields, {:array, :map}
    end
  end
end
