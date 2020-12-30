defmodule ChatApi.Repo.Migrations.CreateDemo do
  use Ecto.Migration

  def change do
    create table(:demo, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :count, :integer

      timestamps()
    end

  end
end
