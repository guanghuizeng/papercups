defmodule ChatApiWeb.ScheduledEventController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.ScheduledEvents
  alias ChatApi.ScheduledEvents.ScheduledEvent

  alias ChatApi.SchedulingLinks
  alias ChatApi.SchedulingLinks.SchedulingLink

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      events = ScheduledEvents.list_by_user(user_id)
      render(conn, "index.json", scheduled_events: events)
    end
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => id}) do
    scheduled_event = ScheduledEvents.get_event!(id)
    render(conn, "show.json", scheduled_event: scheduled_event)
  end

  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"event" => event_params}) do
    %{
      "scheduling_link_id" => scheduling_link_id,
      "guest_name" => guest_name,
      "start_time" => start_time,
    } = event_params

    scheduling_link = SchedulingLinks.get_scheduling_link!(scheduling_link_id)

    with {:ok, start_time, _offset} <- DateTime.from_iso8601(start_time),
#         {:ok, %ScheduledEventType{} = event_type} <- ScheduledEventTypes.get_event_type!(event_type_id),
         {:ok, %ScheduledEvent{} = event} <- ScheduledEvents.create_event(
           %{
             guest_name: guest_name,
             scheduling_link_id: scheduling_link_id,
             user_id: scheduling_link.user_id,
             start_time: start_time
           }
         ) do
      conn
      |> put_status(:created)
      |> render("show.json", scheduled_event: event)
    end
  end

  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"id" => id, "event" => event_params}) do
    json(
      conn,
      %{
        ok: false,
        data: %{}
      }
    )
  end

end
