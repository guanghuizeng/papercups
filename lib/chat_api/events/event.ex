defmodule ChatApi.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "events" do
    field :guest_name, :string
    field :invitee_full_name, :string
    field :invitee_email, :string
    field :start_time, :utc_datetime
    field :additional_info, :string

    belongs_to(:event_type, EventType, type: :binary_id)
    belongs_to(:user, User, type: :integer)

    timestamps()
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:guest_name, :event_type_id, :start_time, :user_id])
    |> validate_required([:guest_name, :event_type_id, :start_time])
  end
end
