defmodule ChatApi.ScheduledEvents do
  require Logger
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.Messages
  alias ChatApi.Messages.Message
  alias ChatApi.ScheduledEvents.ScheduledEvent

  @spec create_event(map()) :: {:ok, ScheduledEvent.t()} | {:error, Ecto.Changeset.t()}
  def create_event(attrs \\ %{}) do
    %ScheduledEvent{}
    |> ScheduledEvent.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_event!(binary()) :: ScheduledEvent.t()
  def get_event!(id), do: Repo.get!(ScheduledEvent, id)

  @spec list_by_start_time(binary(), binary()) :: [ScheduledEvent.t()]
  def list_by_start_time(from_time, to_time) do
    query = from e in ScheduledEvent,
                 where: e.start_time > ^from_time and e.start_time < ^to_time,
                 select: e
    Repo.all(query)
  end

  @spec list_by_user(binary()) :: [ScheduledEvent.t()]
  def list_by_user(user_id) do
    ScheduledEvent
    |> where(user_id: ^user_id)
    |> order_by(asc: :start_at)
    |> Repo.all()
  end

  @spec query_events_closed_for([{:minutes, number}]) :: Ecto.Query.t()
  def query_events_closed_for(minutes: minutes) do
    current = DateTime.utc_now()
    to_time = DateTime.add(current, minutes * 60)
    from e in ScheduledEvent, where: e.start_time < ^to_time and e.start_time > ^current, select: e
  end

  def notify_event(event) do
    Logger.info("notify_event #{inspect(event)}")
    with {:ok, %Message{} = msg} <-
           %{
             "body" => "Hello",
             "user_id" => event.user_id,
             "account_id" => "88d18216-c36b-48f1-9300-0e414017db14",
             "conversation_id" => "88d18216-c36b-48f1-9300-0e414017db14"
           }
           |> Messages.create_message(),
         message <-
           Messages.get_message!(msg.id) do
      message
      |> Messages.Notification.notify(:event_notify_email)
    end
  end

  @spec notify_events(Ecto.Query.t()) :: {}
  def notify_events(%Ecto.Query{} = query) do
    events = Repo.all(query)
    Logger.info("Notify events #{inspect(events)}")
    Enum.each(
      events,
      fn event ->
        notify_event(event)
      end
    )
  end

  def test_notify_events() do
    query = query_events_closed_for(minutes: 90)
    notify_events(query)
  end

end
