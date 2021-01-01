defmodule ChatApi.Schedules.Schedule do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "schedules" do
    field :name, :string
    field :rules, :string
    field :timezone, :string

    timestamps()
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:name, :rules, :timezone])
    |> validate_required([:name, :rules, :timezone])
  end
end
