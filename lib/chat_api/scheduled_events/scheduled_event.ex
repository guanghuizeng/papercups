defmodule ChatApi.ScheduledEvents.ScheduledEvent do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "scheduled_events" do
    field :start_at, :utc_datetime
    field :end_at, :utc_datetime
    field :state, :string
    field :duration, :integer
    field :link_description, :string
    field :link_description_html, :string
    field :summary, :string
    field :cancel_reason, :string
    field :cancel_reason_html, :string
    field :conferencing, :map
    field :attendees, {:array, :binary_id}
    field :fields, {:array, :map}

    belongs_to(:scheduling_link, SchedulingLink, type: :binary_id)
    belongs_to(:user, User, type: :integer)

    timestamps()
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:start_at, :end_at, :state, :duration, :link_description, :link_description_html, :summary,
      :cancel_reason, :cancel_reason_html, :conferencing, :attendees, :scheduling_link_id, :user_id])
  end
end
