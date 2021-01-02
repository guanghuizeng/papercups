defmodule ChatApi.Repo.Migrations.AddUserReferenceTypeToSchedules do
  use Ecto.Migration

  def change do
    alter table(:schedules) do
      add(:user_id, references(:users, type: :integer), null: false)
    end
  end
end
