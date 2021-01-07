defmodule ChatApi.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "events" do
    field :guest_name, :string

    belongs_to(:event_type, EventType, type: :binary_id)

    timestamps()
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:guest_name, :event_type_id])
    |> validate_required([:guest_name, :event_type_id])
  end
end
