defmodule ChatApi.Repo.Migrations.AddUserIdToEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add(:user_id, references(:users))
    end

    create(index(:events, [:user_id]))
  end
end
