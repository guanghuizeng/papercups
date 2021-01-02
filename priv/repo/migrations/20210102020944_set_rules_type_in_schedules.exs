defmodule ChatApi.Repo.Migrations.SetRulesTypeInSchedules do
  use Ecto.Migration

  def change do
    alter table(:schedules) do
      modify :rules, :text
    end
  end
end
