defmodule ChatApi.Repo.Migrations.AddFieldsToEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add :invitee_full_name, :string
      add :invitee_email, :string
      add :start_time, :string
      add :additional_info, :text
    end
  end
end
