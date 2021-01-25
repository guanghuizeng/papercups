defmodule ChatApi.Repo.Migrations.AddFieldsColumnToSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      add :fields, :map
    end
  end
end
