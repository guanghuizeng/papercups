defmodule ChatApi.Repo.Migrations.ModifyFieldsColumnTypeInSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      remove :fields
      add :fields, {:array, :map}
    end
  end
end
