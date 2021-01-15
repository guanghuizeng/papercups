defmodule ChatApi.Workers.SendEventNotificationEmail do
  use Oban.Worker, queue: :mailers

  require Logger

  alias ChatApi.Events

  @impl Oban.Worker
  def perform(%Oban.Job{args: %{"message" => message}}) do
    Logger.info("Performing job: #{inspect(message)}")
    send_email(message)
    :ok
  end

  def send_email(%{"user_id" => nil, "user" => nil}), do: nil

  def send_email(
        %{
          "seen_at" => nil,
          "user_id" => user_id,
          "account_id" => account_id,
          "customer_id" => nil,
          "conversation_id" => conversation_id
        } = _message
      ) do
    Logger.info("Do send_email job #{_message}")
    end
end
