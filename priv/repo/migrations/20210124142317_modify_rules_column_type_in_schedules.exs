defmodule ChatApi.Repo.Migrations.ModifyRulesColumnTypeInSchedules do
  use Ecto.Migration

  def change do
    alter table(:schedules) do
      remove :rules
      add :rules, {:array, :map}
    end
  end
end
