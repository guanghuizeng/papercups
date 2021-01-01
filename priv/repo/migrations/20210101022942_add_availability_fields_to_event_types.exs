defmodule ChatApi.Repo.Migrations.AddAvailabilityFieldsToEventTypes do
  use Ecto.Migration

  def change do
    alter table(:event_types) do
      add :period_type, :string, default: "moving"
      add :min_booking_time, :integer, default: 14400
      add :max_booking_time, :integer, default: 86400
      add :start_date, :string, default: ""
      add :end_date, :string, default: ""
      add :duration, :integer, default: 30
    end
  end
end
