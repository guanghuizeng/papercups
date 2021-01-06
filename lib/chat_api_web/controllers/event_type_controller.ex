defmodule ChatApiWeb.EventTypeController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.EventTypes
  alias ChatApi.EventTypes.EventType

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      event_types = EventTypes.list_event_types_by_user(user_id, filters)
      render(conn, "index.json", event_types: event_types)
    end
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    if Map.has_key?(params, "url") do
      url = Map.get(params, "url", nil)
      event_type = EventTypes.get_event_type_by_url(url)
      json(
        conn,
        %{
          data: %{
            id: event_type.id,
            object: "event_type",
            name: event_type.name,
            location: event_type.location,
            description: event_type.description,
            url: event_type.url,
            color: event_type.color,
            period_type: event_type.period_type,
            min_booking_time: event_type.min_booking_time,
            max_booking_time: event_type.max_booking_time,
            start_date: event_type.start_date,
            end_date: event_type.end_date,
            duration: event_type.duration,
            before_buffer_time: event_type.before_buffer_time,
            after_buffer_time: event_type.after_buffer_time,
            schedule_id: event_type.schedule_id,
          }
        }
      )
    else
      json(
        conn,
        %{
          ok: false,
          data: %{}
        }
      )
    end
  end


  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"event_type" => event_type_params}) do
    %{
      "name" => name,
      "location" => location,
      "description" => description,
      "url" => url,
      "color" => color
    } = event_type_params

    with %{account_id: account_id, id: author_id} <- conn.assigns.current_user,
         #         {:ok, %Schedule{} = schedule} <-
         #           Schedules.create_default_schedule(),
         {:ok, %EventType{} = event_type} <-
           EventTypes.create_event_type(
             %{
               name: name,
               location: location,
               description: description,
               url: url,
               color: color,
               #             schedule: schedule,
             }
           ) do
      conn
      |> put_status(:created)
      |> render("show.json", event_type: event_type)
    end
  end

  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"id" => id, "event_type" => event_type_params}) do
    event_type = EventTypes.get_event_type!(id)

    with {:ok, %EventType{} = event_type} <- EventTypes.update_event_type(event_type, event_type_params) do
      render(conn, "show.json", event_type: event_type)
    end
  end

end
