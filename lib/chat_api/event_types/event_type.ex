defmodule ChatApi.EventTypes.EventType do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "event_types" do
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
    field :duration, :integer

    field :before_buffer_time, :integer
    field :after_buffer_time, :integer

    belongs_to(:schedule, Schedule, type: :binary_id)
    belongs_to(:user, User, type: :integer)

    timestamps()
  end

  @doc false
  def changeset(event_type, attrs) do
    event_type
    |> cast(attrs,
         [:name, :location, :description, :url, :color, :period_type, :min_booking_time, :max_booking_time,
           :start_date, :end_date, :duration, :before_buffer_time, :after_buffer_time, :schedule_id]
       )
    |> validate_required([:name, :location, :url, :color])
  end
end
