defmodule ChatApi.Repo.Migrations.AddDefaultScheduleTypeToUserSetting do
  use Ecto.Migration

  def change do
    alter table(:user_settings) do
      add(:default_schedule_id, references(:schedules, type: :binary_id))
    end
  end
end
