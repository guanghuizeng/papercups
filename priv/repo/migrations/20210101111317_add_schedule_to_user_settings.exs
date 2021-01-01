defmodule ChatApi.Repo.Migrations.AddDefaultScheduleToUserSettings do
  use Ecto.Migration

  def change do
    alter table(:user_settings) do
      add(:schedule_id, references(:schedules, type: :binary_id))
    end
  end
end
