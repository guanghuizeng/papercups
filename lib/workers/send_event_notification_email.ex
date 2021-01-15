defmodule ChatApi.Workers.SendEventNotificationEmail do
  use Oban.Worker, queue: :events

  require Logger

  alias ChatApi.Events

  @impl Oban.Worker
  def perform(%Oban.Job{} = job) do
#    query = Events.
    Logger.info("Performing job: #{inspect(job)}")

    :ok
  end
end
