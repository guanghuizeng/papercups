defmodule ChatApi.Repo.Migrations.AddSlugToUserProfile do
  use Ecto.Migration

  def change do
    alter table(:user_profiles) do
      add :slug, :string, default: ""
    end
  end
end
