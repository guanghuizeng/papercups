defmodule ChatApi.Demos.Demo do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "demos" do
    field :count, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(demo, attrs) do
    demo
    |> cast(attrs, [:name, :count])
    |> validate_required([:name, :count])
  end
end
