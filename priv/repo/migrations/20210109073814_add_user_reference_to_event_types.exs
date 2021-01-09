defmodule ChatApi.Repo.Migrations.AddUserReferenceToEventTypes do
  use Ecto.Migration

  def change do
    alter table(:event_types) do
      add(:user_id, references(:users, type: :integer))
    end
  end
end
