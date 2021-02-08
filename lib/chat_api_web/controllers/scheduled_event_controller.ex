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
  def create(conn, %{"user" => user, "link"  => link, "event" => event_params}) do
    %{
      "displayName" => display_name,
      "email" => email,
      "startAt" => start_at,
      "endAt" => end_at,
      "fields" => fields
    } = event_params

    user_info = Users.get_user_info_by_slug(user)
    if user_info do
      with {:ok, start_time, _offset} <- DateTime.from_iso8601(start_at),
           {:ok, end_time, _offset} <- DateTime.from_iso8601(end_at),
           scheduling_link <- SchedulingLinks.get_scheduling_link_by_url(user_info.user_id, link),
           {:ok, %ScheduledEvent{} = event} <- ScheduledEvents.create_event(
             %{
               start_at: start_time,
               end_at: end_time,
               fields: fields,
               state: "confirmed",
               duration: scheduling_link.duration,
               fields: fields,

               user_id: scheduling_link.user_id,
             }
           )
        do
        conn
        |> put_status(:created)
        |> render("show.json", scheduled_event: event)
      end
    else
    end

#    scheduling_link = SchedulingLinks.get_scheduling_link!(scheduling_link_id)

#    with {:ok, start_time, _offset} <- DateTime.from_iso8601(start_time),
##         {:ok, %ScheduledEventType{} = event_type} <- ScheduledEventTypes.get_event_type!(event_type_id),
#         {:ok, %ScheduledEvent{} = event} <- ScheduledEvents.create_event(
#           %{
#
#
#             guest_name: guest_name,
#             scheduling_link_id: scheduling_link_id,
#             user_id: scheduling_link.user_id,
#             start_time: start_time
#           }
#         ) do
#      conn
#      |> put_status(:created)
#      |> render("show.json", scheduled_event: event)
#    end
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
