defmodule ChatApi.Repo.Migrations.ModifyStartTimeTypeInEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      remove :start_time
    end
  end
end
