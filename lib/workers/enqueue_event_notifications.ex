defmodule ChatApi.Workers.EnqueueEventNotifications do
  use Oban.Worker, queue: :events

  require Logger

  alias ChatApi.Events

  @doc """
  query => events
  events into message
  notification with multi ways, eg. email, wechat,
  """
  @impl Oban.Worker
  def perform(%Oban.Job{} = job) do
    query = Events.query_events_closed_for(10)

    # message_controller.create, save to messages table
    # msg
    # |> notify(msg, :email)
    # |> notify(msg, :sms)
    # |> notify(msg, :feishu)
    # |> notify(msg, :wechat)
    # |> notify(msg, :dingtalk)

    Logger.info("Performing job: #{inspect(job)}")

    :ok
  end
end
