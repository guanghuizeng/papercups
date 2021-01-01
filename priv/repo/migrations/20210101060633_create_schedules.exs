defmodule ChatApi.Repo.Migrations.CreateSchedules do
  use Ecto.Migration

  def change do
    create table(:schedules, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :rules, :string
      add :timezone, :string

      timestamps()
    end

  end
end
