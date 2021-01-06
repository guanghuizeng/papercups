defmodule ChatApi.Repo.Migrations.AddScheduleIdToEventTypes do
  use Ecto.Migration

  def change do
    alter table(:event_types) do
      add(:schedule_id, references(:schedules, type: :binary_id))
    end
  end
end
