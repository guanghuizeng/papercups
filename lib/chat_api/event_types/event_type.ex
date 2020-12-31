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

    timestamps()
  end

  @doc false
  def changeset(event_type, attrs) do
    event_type
    |> cast(attrs, [:name, :location, :description, :url, :color])
    |> validate_required([:name, :location, :url, :color])
  end
end
