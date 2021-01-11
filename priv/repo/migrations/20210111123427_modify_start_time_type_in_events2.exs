defmodule ChatApi.Repo.Migrations.ModifyStartTimeTypeInEvents2 do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add :start_time, :utc_datetime
    end
  end
end
