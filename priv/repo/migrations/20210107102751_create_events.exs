defmodule ChatApi.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :guest_name, :string
      add :event_type_id, references(:event_types, on_delete: :nothing, type: :binary_id), null: false

      timestamps()
    end
  end
end
