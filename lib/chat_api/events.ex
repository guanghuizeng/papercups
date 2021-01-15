defmodule ChatApi.Events do
  require Logger
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.Messages
  alias ChatApi.Messages.Message
  alias ChatApi.Events.Event

  @spec create_event(map()) :: {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_event!(binary()) :: Event.t()
  def get_event!(id), do: Repo.get!(Event, id)

  @spec list_by_start_time(binary(), binary()) :: [Event.t()]
  def list_by_start_time(from_time, to_time) do
    query = from e in Event,
                 where: e.start_time > ^from_time and e.start_time < ^to_time,
                 select: e
    Repo.all(query)
  end

  @spec list_by_user(binary()) :: [Event.t()]
  def list_by_user(user_id) do
    Event
    |> where(user_id: ^user_id)
    |> order_by(asc: :start_time)
    |> Repo.all()
  end

  @spec query_events_closed_for([{:minutes, number}]) :: Ecto.Query.t()
  def query_events_closed_for(minutes: minutes) do
    current = DateTime.utc_now()
    to_time = DateTime.add(current, minutes * 60)
    from e in Event, where: e.start_time < ^to_time and e.start_time > ^current, select: e
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

end
