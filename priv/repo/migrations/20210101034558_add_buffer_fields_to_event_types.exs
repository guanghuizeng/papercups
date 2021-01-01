defmodule ChatApi.Repo.Migrations.AddBufferFieldsToEventTypes do
  use Ecto.Migration

  def change do
    alter table(:event_types) do
      add :before_buffer_time, :integer, default: 0
      add :after_buffer_time, :integer, default: 0
    end
  end
end
