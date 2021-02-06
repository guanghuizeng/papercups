defmodule ChatApi.Repo.Migrations.RemoveSlugFromUserSettings do
  use Ecto.Migration

  def change do
    alter table(:user_settings) do
      remove :slug
    end
  end
end
