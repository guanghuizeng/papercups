defmodule ChatApi.Repo.Migrations.AddSlugToUserSettings do
  use Ecto.Migration

  def change do
    alter table(:user_settings) do
      add :slug, :string, default: ""
    end
  end
end
