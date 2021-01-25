defmodule ChatApi.Repo.Migrations.AddEmailRemindersColumnTypeToSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      add :email_reminders, {:array, :map}
    end
  end
end
