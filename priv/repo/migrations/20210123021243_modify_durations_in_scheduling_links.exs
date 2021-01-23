defmodule ChatApi.Repo.Migrations.ModifyDurationsInSchedulingLinks do
  use Ecto.Migration

  def change do
    alter table(:scheduling_links) do
      remove :duration

      add :durations, {:array, :integer}
    end
  end
end
