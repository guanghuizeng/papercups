defmodule ChatApi.SchedulingLinks.SchedulingLink do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "scheduling_links" do
    field :name, :string
    field :description, :string
    field :location, :string
    field :url, :string
    field :color, :string

    field :period_type, :string
    field :min_booking_time, :integer
    field :max_booking_time, :integer
    field :start_date, :string
    field :end_date, :string
    field :durations, {:array, :integer}

    field :fields, {:array, :map}
    field :email_reminders, {:array, :map}
    field :organizer, :map

    field :before_buffer_time, :integer
    field :after_buffer_time, :integer

    belongs_to(:schedule, Schedule, type: :binary_id)
    belongs_to(:user, User, type: :integer)

    timestamps()
  end

  @doc false
  def changeset(scheduling_link, attrs) do
    scheduling_link
    |> cast(attrs,
         [:name, :location, :description, :url, :color, :period_type, :min_booking_time, :max_booking_time,
           :start_date, :end_date, :durations, :before_buffer_time, :after_buffer_time, :schedule_id, :fields, :email_reminders, :organizer, :user_id]
       )
  end
end
