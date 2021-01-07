defmodule ChatApiWeb.EventController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    json(
      conn,
      %{
        ok: false,
        data: %{}
      }
    )
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
      json(
        conn,
        %{
          ok: false,
          data: %{}
        }
      )
  end


  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"event" => event_params}) do
    %{
      "guest_name" => guest_name,
      "event_type_id" => event_type_id
    } = event_params

    with {:ok, %Event{} = event} <-
           Events.create_event(
             %{
               guest_name: guest_name,
               event_type_id: event_type_id
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
