defmodule ChatApi.Repo.Migrations.AddSchedulingBizTables do
  use Ecto.Migration

  def change do

    drop_if_exists constraint("events", "events_event_type_id_fkey")
    drop_if_exists table("event_types")
    drop_if_exists index("events", [:user_id])
    drop_if_exists table("events")
#
#    create table(:schedules, primary_key: false) do
#      add :id, :binary_id, primary_key: true
#      add :name, :string
#      add :rules, :text
#      add :timezone, :string
#      add :user_id, references(:users, type: :integer), null: false
#
#      timestamps()
#    end

    create_if_not_exists table(:scheduling_links, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :string
      add :url, :string
      add :color, :string
      add :location, :string

      add :period_type, :string, default: "moving"
      add :min_booking_time, :integer, default: 14400
      add :max_booking_time, :integer, default: 86400
      add :start_date, :string, default: ""
      add :end_date, :string, default: ""
      add :duration, :integer, default: 30
      add :before_buffer_time, :integer, default: 0
      add :after_buffer_time, :integer, default: 0


      add(:schedule_id, references(:schedules, type: :binary_id))
      add(:user_id, references(:users, type: :integer))

      timestamps()
    end

    create_if_not_exists table(:scheduled_events, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :guest_name, :string
      add :invitee_full_name, :string
      add :invitee_email, :string
      add :additional_info, :text
      add :start_time, :utc_datetime
      add(:user_id, references(:users))


      add :scheduling_link_id, references(:scheduling_links, on_delete: :nothing, type: :binary_id), null: false

      timestamps()
    end

    create_if_not_exists(index(:scheduled_events, [:user_id]))

#    alter table(:user_settings) do
#      add(:schedule_id, references(:schedules, type: :binary_id))
#      add(:default_schedule_id, references(:schedules, type: :binary_id))
#      add :slug, :string, default: ""
#    end
  end
end
