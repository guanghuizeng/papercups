defmodule ChatApiWeb.EventTypeController do
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

  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"event_type" => event_type_params}) do
    %{"name" => name, "location" => location, "description" => description, "url" => url, "color" => color} = event_type_params

    with %{account_id: account_id, id: author_id} <- conn.assigns.current_user,
         {:ok, %EventType{} = event_type} <-
           EventTypes.create_event_type(%{
             name: name,
             location: location,
             description: description,
             url: url,
             color: color
           }) do
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
