defmodule ChatApiWeb.EventController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  alias ChatApi.SchedulingLinks
  alias ChatApi.SchedulingLinks.SchedulingLink

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      Logger.info(inspect(user_id))
      events = Events.list_by_user(user_id)
      Logger.info(inspect(events))
      render(conn, "index.json", events: events)
    end
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    with %{id: user_id} <- conn.assigns.current_user do
      scheduled_events = Events.list_by_user(user_id)
      render(conn, "show.json", events: scheduled_events)
    end
  end


  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"event" => event_params}) do
    %{
      "guest_name" => guest_name,
      "scheduling_link_id" => scheduling_link_id,
      "start_time" => start_time,
    } = event_params
    scheduling_link = SchedulingLinks.get_scheduling_link!(scheduling_link_id)

    with {:ok, start_time, _offset} <- DateTime.from_iso8601(start_time),
#         {:ok, %EventType{} = event_type} <- EventTypes.get_event_type!(event_type_id),
         {:ok, %Event{} = event} <- Events.create_event(
           %{
             guest_name: guest_name,
             scheduling_link_id: scheduling_link,
             user_id: scheduling_link.user_id,
             start_time: start_time
           }
         ) do
      conn
      |> put_status(:created)
      |> render("show.json", event: event)
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
