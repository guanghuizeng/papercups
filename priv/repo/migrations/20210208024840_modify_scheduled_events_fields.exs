defmodule ChatApi.Repo.Migrations.ModifyScheduledEventsFields do
  use Ecto.Migration

  def change do
    alter table(:scheduled_events) do
      remove :guest_name
      remove :invitee_full_name
      remove :invitee_email
      remove :additional_info
      remove :start_time

      add :start_at, :utc_datetime
      add :end_at, :utc_datetime
      add :state, :string
      add :duration, :integer
      add :link_description, :string
      add :link_description_html, :string
      add :summary, :string
      add :cancel_reason, :string
      add :cancel_reason_html, :string
      add :conferencing, :map
      add :attendees, {:array, :binary_id}
    end
  end
end
